# Directus CMS Setup Guide

## Installation Complete

Directus has been installed and configured with Supabase as the backend database. The React application has been updated to use Directus hooks for content management.

## What's Been Done

1. ✅ **Environment Configuration**: Set up `.env` with Supabase credentials and Directus configuration
2. ✅ **Directus Installation**: Installed Directus and Directus SDK
3. ✅ **Database Setup**: Connected to Supabase PostgreSQL database
4. ✅ **React Integration**: Created hooks and services for Directus API integration
5. ✅ **Component Updates**: Updated Layout and Home components to use Directus data

## Next Steps Required

### 1. Start Services

Run both Directus and React development servers:

```bash
npm run dev
```

OR run them separately:

```bash
# Terminal 1 - Start Directus
npm run directus

# Terminal 2 - Start React
npm start
```

### 2. Access Directus Admin

1. Navigate to: `http://localhost:8055/admin`
2. Login with your configured admin credentials

### 3. Update Admin User

Once logged in:
1. Go to User Management
2. Edit the admin user
3. Update email and password as needed

### 4. Create Data Models

Create these collections in Directus:

#### Pages Collection
- **Collection Name**: `pages`
- **Fields**:
  - `title` (String, Required)
  - `slug` (String, Required, Unique)
  - `page_type` (Dropdown: home, about, services, gallery, contact)
  - `meta_title` (String)
  - `meta_description` (Text)
  - `hero_title` (String)
  - `hero_subtitle` (Text)
  - `hero_image` (File)
  - `content` (Rich Text)
  - `gallery_images` (JSON)
  - `status` (Dropdown: published, draft)

#### Global Settings Collection
- **Collection Name**: `global_settings`
- **Type**: Singleton
- **Fields**:
  - `site_title` (String, Required)
  - `tagline` (String)
  - `phone` (String)
  - `email` (String)
  - `address` (Text)
  - `logo` (File)
  - `favicon` (File)

#### Navigation Collection
- **Collection Name**: `navigation`
- **Fields**:
  - `label` (String, Required)
  - `url` (String)
  - `page` (Many-to-One relationship to Pages)
  - `parent` (Many-to-One relationship to Navigation)
  - `target` (Dropdown: _self, _blank)
  - `sort` (Integer)
  - `status` (Dropdown: published, draft)

### 5. Set Permissions

For each collection, set public read permissions:
1. Go to Settings > Roles & Permissions
2. Click on "Public" role
3. For each collection, enable "Read" permission

### 6. Add Initial Content

Create initial content for:
- Global Settings (site title, contact info)
- Navigation menu items
- Page content for existing routes

## Development Workflow

### Starting Development
```bash
npm run dev
```

### Accessing Services
- **React App**: `http://localhost:3000`
- **Directus Admin**: `http://localhost:8055/admin`
- **Directus API**: `http://localhost:8055`

### File Structure
```
src/
├── lib/
│   └── directus.ts          # Directus client and types
├── hooks/
│   └── useDirectus.ts       # React hooks for data fetching
├── components/
│   └── Layout.tsx           # Updated with Directus data
└── pages/
    └── Home.tsx             # Updated with Directus data
```

## Environment Variables

The following environment variables are configured in `.env`:

```
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Directus Configuration
KEY=your_directus_key
SECRET=your_directus_secret
PUBLIC_URL=http://localhost:8574
PORT=8574

# Database Configuration
DB_CLIENT=pg
DB_HOST=your_db_host
DB_PORT=5432
DB_DATABASE=postgres
DB_USER=postgres
DB_PASSWORD=your_db_password

# React App Configuration
REACT_APP_DIRECTUS_URL=http://localhost:8055
```

## Troubleshooting

### Directus Won't Start
- Check if the database connection is working
- Verify environment variables are correct
- Check if port 8055 is available

### React App Can't Connect to Directus
- Ensure Directus is running on port 8055
- Check CORS settings in Directus
- Verify REACT_APP_DIRECTUS_URL is correct

### Database Connection Issues
- Verify Supabase credentials
- Check if the database allows external connections
- Ensure SSL is properly configured

## Production Deployment

For production deployment:
1. Update environment variables for production URLs
2. Configure proper authentication in Directus
3. Set up proper CORS policies
4. Use a production-ready database configuration
5. Configure file storage for uploads

## Support

The React application includes fallback data, so it will work even if Directus is not running. This ensures the site remains functional during development and setup.