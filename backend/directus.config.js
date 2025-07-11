require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8055, // Use Railway's PORT variable
  public_url: process.env.PUBLIC_URL || 'http://localhost:8055', // Use Railway's PUBLIC_URL variable
  
  database: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      family: 4 // Force IPv4
    }
  },

  redis: false,

  cache: {
    enabled: false
  },

  rateLimiter: {
    enabled: false
  },

  security: {
    key: process.env.DIRECTUS_KEY,
    secret: process.env.DIRECTUS_SECRET
  },

  admin: {
    email: process.env.DIRECTUS_ADMIN_EMAIL,
    password: process.env.DIRECTUS_ADMIN_PASSWORD
  },

  cors: {
    enabled: true,
    origin: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3574', 'http://127.0.0.1:3574'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
  },

  storage: {
    locations: {
      local: {
        driver: 'local',
        root: './uploads'
      }
    }
  },

  assets: {
    cache: false,
    transform: {
      enabled: false
    }
  },

  // Public registration and access settings
  public: {
    registration: false,
    assets: {
      enabled: true
    }
  }
};