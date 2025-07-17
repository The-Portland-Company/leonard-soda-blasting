# Railway Environment Variables Configuration

This document outlines the environment variables required for deploying the Leonard Soda Blasting application to Railway.

## Required Variables for Railway Deployment

### Frontend (Next.js)
```env
# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=https://your-app.railway.app

# Directus CMS
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus.railway.app

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wqqouhawtmibmvcdkypw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxcW91aGF3dG1pYm12Y2RreXB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjcyNzYsImV4cCI6MjA2Nzg0MzI3Nn0._aP2Jbt-gtUclisdeM1oNkXoEiJr2MHFh8R4sMA4o48

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=info@leonardsodablasting.com

# Image Configuration
NEXT_PUBLIC_IMAGE_DOMAINS=leonardsodablasting.com
```

### Backend (Directus)
```env
# Port (Railway will provide this)
PORT=$PORT

# Public URL (Railway will provide this)
PUBLIC_URL=https://your-directus.railway.app

# Database Configuration (Use Transaction Pooler for Railway)
DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.wqqouhawtmibmvcdkypw
DB_PASSWORD=33RW68f3nYLtQUyr
DB_DATABASE=postgres
DB_SSL=true

# Directus Security
DIRECTUS_KEY=your-directus-key
DIRECTUS_SECRET=your-directus-secret
DIRECTUS_ADMIN_EMAIL=admin@leonardsodablasting.com
DIRECTUS_ADMIN_PASSWORD=your-admin-password

# CORS Configuration
CORS_ORIGINS=https://your-frontend.railway.app,https://leonardsodablasting.com

# Storage (Railway volume mount)
RAILWAY_VOLUME_MOUNT_PATH=/app/uploads
```

### Supabase Edge Functions
```env
# Resend Email Configuration
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@leonardsodablasting.com
RESEND_API_URL=https://api.resend.com/emails

# Environment
ENVIRONMENT=production

# Email Configuration
ADMIN_EMAIL=info@leonardsodablasting.com

# Supabase URL (for function self-reference)
SUPABASE_URL=https://wqqouhawtmibmvcdkypw.supabase.co
```

## Railway-Specific Considerations

### Database Connection
**CRITICAL**: Always use Supabase's Transaction Pooler for Railway deployments:
- Host: `aws-0-us-east-2.pooler.supabase.com`
- Port: `6543`
- **Do NOT use**: Direct connection (`db.wqqouhawtmibmvcdkypw.supabase.co:5432`)

### Service Discovery
- Use Railway's generated service URLs
- Frontend should reference backend via Railway's internal service URLs
- Configure CORS to allow Railway domains

### Environment Variable Templates
Railway supports environment variable templates. Create templates for:
- Development environment
- Staging environment  
- Production environment

## Development vs Production

### Development (.env.local)
```env
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8574
NEXT_PUBLIC_ADMIN_EMAIL=agency@theportlandcompany.com
```

### Production (Railway)
```env
NEXT_PUBLIC_FRONTEND_URL=https://leonardsodablasting.com
NEXT_PUBLIC_DIRECTUS_URL=https://directus.leonardsodablasting.com
NEXT_PUBLIC_ADMIN_EMAIL=info@leonardsodablasting.com
```

## Security Best Practices

1. Never commit sensitive environment variables to the repository
2. Use Railway's built-in secrets management
3. Rotate API keys regularly
4. Use different credentials for development and production
5. Enable proper CORS configuration

## Testing Configuration

Before deploying to production:
1. Test all environment variables in Railway's staging environment
2. Verify database connections work with Transaction Pooler
3. Test API endpoints and email functionality
4. Confirm image loading and asset serving
5. Validate CORS configuration

## Troubleshooting

### Common Issues:
- **Database Connection Failed**: Ensure you're using the Transaction Pooler
- **CORS Errors**: Check CORS_ORIGINS includes your frontend URL
- **Image Loading Issues**: Verify NEXT_PUBLIC_IMAGE_DOMAINS is set correctly
- **Email Not Sending**: Check RESEND_API_KEY and ADMIN_EMAIL configuration

### Verification Commands:
```bash
# Check environment variables are loaded
echo $NEXT_PUBLIC_DIRECTUS_URL

# Test database connection
pg_isready -h aws-0-us-east-2.pooler.supabase.com -p 6543

# Verify service URLs
curl https://your-directus.railway.app/server/health
```