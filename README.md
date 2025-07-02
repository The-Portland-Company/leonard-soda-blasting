# Leonard Soda Blasting

Full-stack application for Leonard Soda Blasting services, built with React frontend and Directus CMS backend.

## Project Structure

```
leonard-soda-blasting/
├── frontend/          # React.js frontend application
├── backend/           # Directus CMS backend
├── deployment/        # Railway, Docker, and deployment configurations
├── scripts/           # Setup and maintenance scripts
├── docs/             # Documentation and setup guides
└── package.json      # Root package.json for workspace management
```

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Chakra UI** for components
- **React Router** for navigation
- **Directus SDK** for CMS integration

### Backend
- **Directus 11.9** CMS
- **PostgreSQL** database
- **Node.js 22+** runtime

## Development Setup

### Prerequisites
- Node.js 22+ (required for Directus)
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
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database credentials
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

   This runs both:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8055

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
   - Add environment variables from `backend/.env`
   - Railway will automatically use `deployment/backend.nixpacks.toml`

2. **Deploy Frontend:**
   - Create second Railway service
   - Set source to `/frontend`
   - Update `REACT_APP_DIRECTUS_URL` to backend URL
   - Railway will automatically use `deployment/frontend.nixpacks.toml`

### Docker

```bash
# Build and run with Docker Compose
docker-compose -f deployment/docker-compose.yml up --build
```

## Admin Access

- **Directus Admin:** http://localhost:8055/admin
- **Username:** agency@theportlandcompany.com
- **Password:** [See backend/.env]

## Available Scripts

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run start` - Start backend only
- `npm run install:all` - Install all dependencies
- `npm run clean` - Remove all node_modules

## Environment Variables

### Backend (.env)
```
DIRECTUS_KEY=your-directus-key
DIRECTUS_SECRET=your-directus-secret
DIRECTUS_ADMIN_EMAIL=your-admin-email
DIRECTUS_ADMIN_PASSWORD=your-admin-password
DB_HOST=your-db-host
DB_PORT=5432
DB_DATABASE=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
```

### Frontend
```
REACT_APP_DIRECTUS_URL=http://localhost:8055
```

## Project Features

- **Content Management:** Directus CMS for easy content updates
- **Responsive Design:** Mobile-first approach with Chakra UI
- **SEO Optimized:** Meta tags and structured data
- **Image Gallery:** Dynamic image galleries from CMS
- **Contact Forms:** Integrated contact functionality
- **Service Pages:** Dynamic service pages with CMS content

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Private project for Leonard Soda Blasting.