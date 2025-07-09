#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "Error: .env file not found!"
  exit 1
fi

# Check if psql is installed
if ! command -v psql &> /dev/null
then
    echo "psql could not be found. Please install PostgreSQL client tools."
    exit 1
fi

# Test database connection using psql
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -d "$DB_DATABASE" -U "$DB_USER" -c "SELECT 1;" -t -q

if [ $? -eq 0 ]; then
  echo "Database connection successful!"
else
  echo "Database connection failed. Check your credentials and network." >&2
fi
