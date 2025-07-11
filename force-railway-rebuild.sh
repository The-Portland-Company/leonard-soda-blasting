#!/bin/bash

echo "🚀 Force Railway rebuild script"
echo "================================"

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Login check
echo "📋 Checking Railway authentication..."
railway whoami

if [ $? -ne 0 ]; then
    echo "🔑 Please login to Railway first:"
    echo "railway login"
    exit 1
fi

echo ""
echo "🔄 Forcing rebuild to clear cache..."
echo "This will trigger a fresh deployment with clean cache"

# Force redeploy frontend service
echo "🎯 Redeploying frontend service..."
railway redeploy --service frontend

if [ $? -eq 0 ]; then
    echo "✅ Frontend service redeployment triggered successfully"
else
    echo "⚠️  Frontend redeploy failed, trying alternative approach..."
    
    # Alternative: redeploy without specifying service
    echo "🔄 Attempting general redeploy..."
    railway redeploy
    
    if [ $? -eq 0 ]; then
        echo "✅ General redeployment triggered successfully"
    else
        echo "❌ Redeploy failed. You may need to manually trigger deployment from Railway dashboard"
        exit 1
    fi
fi

echo ""
echo "🎉 Deployment triggered! Monitor progress in Railway dashboard"
echo "🔗 https://railway.app/dashboard"