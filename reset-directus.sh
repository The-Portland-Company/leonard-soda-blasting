#!/bin/bash

echo "🚀 Starting Directus reset and setup..."

# Navigate to backend directory
cd backend || exit 1

# Kill any running Directus processes
echo "🛑 Stopping any running Directus processes..."
pkill -f "directus start" || true

# Run the database reset script
echo "🗑️ Resetting database tables..."
node ../scripts/reset-and-setup-directus.js

# Bootstrap Directus
echo "🔧 Running Directus bootstrap..."
npm run bootstrap

echo "✅ Reset and bootstrap complete!"
echo ""
echo "Next steps:"
echo "1. Start Directus: cd backend && npm start"
echo "2. Go to http://localhost:8055/admin"
echo "3. Login with: agency@theportlandcompany.com / J9u76asecdst!"
echo "4. Create Pages collection manually"