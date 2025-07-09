# Leonard Soda Blasting

Full-stack application for Leonard Soda Blasting services, built with React frontend and Directus CMS backend.

## Project Structure

```
leonard-soda-blasting/
├── frontend/          # React.js frontend application
├── backend/           # Directus CMS backend
├── deployment/        # Railway deployment configurations
├── scripts/           # Setup and maintenance scripts
├── docs/             # Documentation and setup guides
├── src/              # Legacy source files (being phased out)
├── public/           # Static assets (duplicated from frontend)
└── package.json      # Root package.json for workspace management
```

## Port Configuration

The application uses the following ports:

- **Frontend Development**: Port 3574 (React dev server)
- **Backend (Directus)**: Port 8574 (custom Directus port)
- **PostgreSQL Database**: Port 5432 (standard PostgreSQL port)
- **Frontend Production**: Uses `$PORT` environment variable (Railway deployment)

## Tech Stack

### Frontend
- **React 19.1.0** with TypeScript
- **Chakra UI 3.20.0** for components
- **React Router 6.30.1** for navigation
- **Directus SDK 20.0.0** for CMS integration
- **Framer Motion 12.16.0** for animations

### Backend
- **Directus 11.9.2** CMS
- **PostgreSQL** database
- **Node.js 18+** runtime (backend), **Node.js 20+** (frontend)

## Development Setup

### Prerequisites
- Node.js 18+ (backend), Node.js 20+ (frontend)
- PostgreSQL database
- Git

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd leonard-soda-blasting
   npm run install:all
   ```

2. **Configure environment:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   # Edit .env with your database credentials and configuration
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This runs both:
   - Frontend: http://localhost:3574 (with HMR)
   - Backend: http://localhost:8574
   
   **Development Notes:**
   - Always use `npm run dev` on port 3574 for frontend development
   - Hot Module Replacement (HMR) is enabled for fast development
   - Never use alternative servers or build processes during development

### Individual Services

**Frontend only:**
```bash
cd frontend
npm install
npm run dev
```

**Backend only:**
```bash
cd backend
npm install
npm run dev
```

## Deployment

### Railway (Recommended)

This project is optimized for Railway deployment using nixpacks:

1. **Deploy Backend:**
   - Create new Railway project
   - Connect GitHub repository
   - Set source to `/backend`
   - Add environment variables from root `.env`
   - Railway will use `backend/nixpacks.toml`
   - Backend runs on port 8574

2. **Deploy Frontend:**
   - Create second Railway service
   - Set source to `/frontend`
   - Update `REACT_APP_DIRECTUS_URL` to backend URL
   - Railway will use root `nixpacks.toml`
   - Frontend uses dynamic `$PORT` environment variable

### Railway Deployment

Deploy using nixpacks configuration files for each service.

This will start:
- Frontend on port 3574
- Backend on port 8574  
- PostgreSQL on port 5432

## Admin Access

- **Directus Admin:** http://localhost:8574/admin
- **Username:** Set in DIRECTUS_ADMIN_EMAIL environment variable
- **Password:** Set in DIRECTUS_ADMIN_PASSWORD environment variable

## Available Scripts

- `npm run dev` - Start both frontend (port 3574) and backend (port 8574)
- `npm run dev:frontend` - Start frontend only on port 3574
- `npm run dev:backend` - Start backend only on port 8574
- `npm run build` - Build frontend for production
- `npm run start` - Serve built frontend on port 3574
- `npm run install:all` - Install all dependencies
- `npm run clean` - Remove all node_modules

## Environment Variables

### Root Directory (.env)
```
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=directus
DB_USER=postgres
DB_PASSWORD=postgres
DIRECTUS_PORT=8574
DIRECTUS_PUBLIC_URL=http://localhost:8574
DIRECTUS_KEY=your-directus-key
DIRECTUS_SECRET=your-directus-secret
DIRECTUS_ADMIN_EMAIL=your-admin-email
DIRECTUS_ADMIN_PASSWORD=your-admin-password
```

### Frontend Environment
The frontend uses environment variables defined in the Directus configuration:
```
REACT_APP_DIRECTUS_URL=http://localhost:8574
```

## Project Features

- **Content Management:** Directus CMS for easy content updates
- **Responsive Design:** Mobile-first approach with Chakra UI
- **SEO Optimized:** Meta tags and structured data with react-helmet-async
- **Image Gallery:** Dynamic image galleries from CMS
- **Contact Forms:** Integrated contact functionality
- **Service Pages:** Dynamic service pages with CMS content
- **Animation Support:** Framer Motion for smooth animations
- **TypeScript Support:** Full TypeScript implementation for both frontend and backend

## Focus Services

These service pages require special attention and should follow the same component patterns as About, Gallery, and Contact pages:

- **Food Processing Equipment** - FDA-compliant cleaning for commercial kitchens
- **Fire & Water Damage** - Professional restoration services
- **Log Homes** - Gentle wood-safe cleaning and restoration
- **Boat & Marine** - Marine vessel cleaning with eco-friendly methods

These pages use proper SEOHead components with specific titles and descriptions, matching the pattern used by working pages.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Private project for Leonard Soda Blasting.