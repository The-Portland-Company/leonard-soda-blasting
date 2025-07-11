- Never hard code page titles, meta titles, page content, menu items, etc...

# ⚠️ VERY IMPORTANT: Railway Deployment Database Configuration

**CRITICAL:** When deploying to Railway, you MUST use Supabase's **Transaction Pooler** instead of direct database connections due to Railway's IPv6/IPv4 compatibility issues.

## Required Database Configuration for Railway:

```
DB_HOST=aws-0-us-east-2.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.wqqouhawtmibmvcdkypw
DB_PASSWORD=33RW68f3nYLtQUyr
DATABASE_URL=postgresql://postgres.wqqouhawtmibmvcdkypw:33RW68f3nYLtQUyr@aws-0-us-east-2.pooler.supabase.com:6543/postgres
```

**DO NOT** use the direct database connection (`db.wqqouhawtmibmvcdkypw.supabase.co:5432`) on Railway - it will fail due to IPv4 limitations.