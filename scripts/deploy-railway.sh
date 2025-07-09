#!/bin/bash

# Leonard Soda Blasting - Railway Deployment Script
# This script automates Railway deployment and debugging

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Railway CLI is installed
check_railway_cli() {
    print_status "Checking Railway CLI installation..."
    if ! command -v railway &> /dev/null; then
        print_error "Railway CLI is not installed!"
        print_status "Install it with: npm install -g @railway/cli"
        exit 1
    fi
    print_success "Railway CLI is installed ($(railway --version))"
}

# Function to check if user is logged in
check_railway_auth() {
    print_status "Checking Railway authentication..."
    if ! railway whoami &> /dev/null; then
        print_error "Not logged into Railway!"
        print_status "Please run: railway login"
        exit 1
    fi
    print_success "Logged in as: $(railway whoami)"
}

# Function to link to project
link_project() {
    print_status "Linking to Leonard Soda Blasting project..."
    
    # Check if already linked
    if railway status &> /dev/null; then
        print_success "Already linked to project"
        railway status
        return 0
    fi
    
    print_warning "Project not linked. Please link manually:"
    print_status "Run: railway link"
    print_status "Then select 'Leonard Soda Blasting' from the list"
    
    read -p "Have you linked the project? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please link the project first"
        exit 1
    fi
}

# Function to check project status
check_status() {
    print_status "Checking project status..."
    railway status
}

# Function to view variables
check_variables() {
    print_status "Checking environment variables..."
    railway variables
}

# Function to view recent logs
view_logs() {
    print_status "Viewing recent deployment logs..."
    
    echo
    print_status "=== DEPLOYMENT LOGS ==="
    railway logs --deployment || print_warning "No deployment logs available"
    
    echo
    print_status "=== BUILD LOGS ==="
    railway logs --build || print_warning "No build logs available"
    
    echo
    print_status "=== FRONTEND SERVICE LOGS ==="
    railway logs --service frontend || print_warning "Frontend service not found or no logs"
    
    echo
    print_status "=== BACKEND SERVICE LOGS ==="
    railway logs --service backend || print_warning "Backend service not found or no logs"
}

# Function to deploy
deploy_project() {
    print_status "Deploying project to Railway..."
    
    # Ensure we're on the latest commit
    print_status "Checking git status..."
    git status --porcelain
    
    if [[ -n $(git status --porcelain) ]]; then
        print_warning "You have uncommitted changes!"
        read -p "Continue with deployment? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Deployment cancelled"
            exit 1
        fi
    fi
    
    print_status "Current commit: $(git rev-parse --short HEAD)"
    print_status "Current branch: $(git branch --show-current)"
    
    # Deploy
    railway up
    
    if [ $? -eq 0 ]; then
        print_success "Deployment initiated successfully!"
    else
        print_error "Deployment failed!"
        exit 1
    fi
}

# Function to monitor deployment
monitor_deployment() {
    print_status "Monitoring deployment..."
    print_status "You can also check the Railway dashboard for real-time updates"
    
    # Wait a bit then check logs
    sleep 10
    print_status "Checking deployment logs..."
    railway logs --deployment | tail -20
}

# Function to validate deployment configuration
validate_config() {
    print_status "Validating deployment configuration..."
    
    # Check if nixpacks files exist
    if [[ ! -f "deployment/frontend.nixpacks.toml" ]]; then
        print_error "Missing deployment/frontend.nixpacks.toml"
        exit 1
    fi
    
    if [[ ! -f "deployment/backend.nixpacks.toml" ]]; then
        print_error "Missing deployment/backend.nixpacks.toml"
        exit 1
    fi
    
    if [[ ! -f "deployment/railway.json" ]]; then
        print_error "Missing deployment/railway.json"
        exit 1
    fi
    
    # Check Node.js version consistency
    print_status "Checking Node.js version consistency..."
    
    frontend_node=$(grep "nodejs-" deployment/frontend.nixpacks.toml | grep -o "nodejs-[0-9]*" | head -1)
    backend_node=$(grep "nodejs-" deployment/backend.nixpacks.toml | grep -o "nodejs-[0-9]*" | head -1)
    
    print_status "Frontend Node.js: $frontend_node"
    print_status "Backend Node.js: $backend_node"
    
    if [[ "$frontend_node" != "$backend_node" ]]; then
        print_warning "Node.js versions don't match between frontend and backend!"
    else
        print_success "Node.js versions are consistent"
    fi
    
    print_success "Configuration validation passed"
}

# Function to show help
show_help() {
    echo "Leonard Soda Blasting Railway Deployment Script"
    echo
    echo "Usage: $0 [command]"
    echo
    echo "Commands:"
    echo "  check     - Check Railway CLI, auth, and project status"
    echo "  validate  - Validate deployment configuration"
    echo "  logs      - View deployment and service logs"
    echo "  deploy    - Deploy the project to Railway"
    echo "  monitor   - Monitor recent deployment"
    echo "  full      - Run full deployment process (default)"
    echo "  help      - Show this help message"
    echo
    echo "Examples:"
    echo "  $0 check         # Check status only"
    echo "  $0 deploy        # Deploy only"
    echo "  $0 full          # Full deployment process"
    echo "  $0               # Same as 'full'"
}

# Main execution
main() {
    echo "🚂 Leonard Soda Blasting Railway Deployment Script"
    echo "=================================================="
    echo
    
    case "${1:-full}" in
        "check")
            check_railway_cli
            check_railway_auth
            link_project
            check_status
            check_variables
            ;;
        "validate")
            validate_config
            ;;
        "logs")
            link_project
            view_logs
            ;;
        "deploy")
            check_railway_cli
            check_railway_auth
            link_project
            validate_config
            deploy_project
            ;;
        "monitor")
            link_project
            monitor_deployment
            ;;
        "full")
            check_railway_cli
            check_railway_auth
            link_project
            validate_config
            check_status
            view_logs
            echo
            read -p "Proceed with deployment? (y/n): " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                deploy_project
                monitor_deployment
                print_success "Deployment process completed!"
                print_status "Check Railway dashboard for final status"
            else
                print_status "Deployment cancelled"
            fi
            ;;
        "help"|"--help"|"-h")
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"