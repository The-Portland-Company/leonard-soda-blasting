require('dotenv').config();

module.exports = {
  port: process.env.DIRECTUS_PORT || 8055,
  public_url: process.env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055',
  
  database: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
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
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
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

  access: {
    assets: {
      public: true
    }
  }
};