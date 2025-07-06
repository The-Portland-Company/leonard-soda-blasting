# Railway Deployment Guide

This guide provides automated deployment tools for the Leonard Soda Blasting project on Railway.

## Prerequisites

1. **Railway CLI** - Install globally:
   ```bash
   npm install -g @railway/cli
   ```

2. **Railway Account** - Login to your account:
   ```bash
   railway login
   ```

3. **Git Repository** - Ensure your code is committed and pushed to the repository.

## Quick Deployment

### Option 1: Automated Script (Recommended)

Use the provided deployment script:

```bash
# Full deployment process (recommended for first time)
./deploy-railway.sh

# Or specific commands:
./deploy-railway.sh check     # Check status only
./deploy-railway.sh validate  # Validate configuration
./deploy-railway.sh logs      # View logs
./deploy-railway.sh deploy    # Deploy only
./deploy-railway.sh monitor   # Monitor deployment
```

### Option 2: Manual Commands

```bash
# 1. Link to project
railway link
# Select "Leonard Soda Blasting"

# 2. Check project status
railway status

# 3. View logs for debugging
railway logs --deployment --build
railway logs --service frontend
railway logs --service backend

# 4. Check environment variables
railway variables

# 5. Deploy
railway up

# 6. Monitor deployment
railway logs --deployment | tail -20
```

## Project Structure

The project has separate configurations for frontend and backend:

```
deployment/
├── frontend.nixpacks.toml    # Frontend build configuration
├── backend.nixpacks.toml     # Backend build configuration
├── railway.json              # Railway project settings
└── docker-compose.yml        # Alternative Docker setup
```

## Configuration Details

### Frontend Service
- **Build**: React app with `npm run build`
- **Serve**: Static files on port from `$PORT`
- **Node.js**: Version 20

### Backend Service  
- **Build**: Directus CMS with `npm install --production`
- **Start**: `npm start` (Directus server)
- **Node.js**: Version 20
- **Database**: PostgreSQL (configure via environment variables)

## Environment Variables

Ensure these are set in Railway dashboard:

### Backend Service
```
NODE_ENV=production
DB_HOST=<your-postgres-host>
DB_PORT=5432
DB_DATABASE=<your-database-name>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DIRECTUS_KEY=<your-directus-key>
DIRECTUS_SECRET=<your-directus-secret>
DIRECTUS_ADMIN_EMAIL=<admin-email>
DIRECTUS_ADMIN_PASSWORD=<admin-password>
PUBLIC_URL=<your-backend-railway-url>
```

### Frontend Service
```
REACT_APP_DIRECTUS_URL=<your-backend-railway-url>
```

## Troubleshooting

### Common Issues

1. **Node.js Version Mismatch**
   - Ensure nixpacks and package.json engines match
   - Current setup uses Node.js 20

2. **Build Failures**
   - Check `railway logs --build` for detailed error messages
   - Verify all dependencies in package.json

3. **Runtime Errors**
   - Check `railway logs --deployment` for runtime issues
   - Verify environment variables are set correctly

4. **Database Connection Issues**
   - Ensure PostgreSQL service is running
   - Verify database credentials in environment variables
   - Check if database migration completed: `railway run npm run migrate`

### Debug Commands

```bash
# View specific service logs
railway logs --service frontend --lines 100
railway logs --service backend --lines 100

# Check environment variables
railway variables

# Run database migration manually
railway run --service backend npm run migrate

# Connect to database shell
railway connect postgres

# SSH into running service
railway ssh --service backend
```

## Manual Railway Setup

If automated deployment fails, set up services manually:

1. **Create Railway Project**
   - Go to Railway dashboard
   - Create new project from GitHub repo

2. **Add Services**
   - Add service for frontend (source: `/frontend`)
   - Add service for backend (source: `/backend`)
   - Add PostgreSQL database

3. **Configure Build Settings**
   - Frontend: Use `deployment/frontend.nixpacks.toml`
   - Backend: Use `deployment/backend.nixpacks.toml`

4. **Set Environment Variables**
   - Configure as listed above
   - Link database to backend service

5. **Deploy**
   - Trigger manual deployment from dashboard
   - Monitor logs for issues

## Support

For deployment issues:
1. Check Railway logs first
2. Verify configuration files
3. Ensure environment variables are set
4. Check Node.js version compatibility

The deployment script provides detailed logging and validation to help identify issues quickly.