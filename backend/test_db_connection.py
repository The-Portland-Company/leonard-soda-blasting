import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_DATABASE = os.getenv("DB_DATABASE")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

try:
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_DATABASE,
        user=DB_USER,
        password=DB_PASSWORD,
        sslmode='require' # Supabase requires SSL
    )
    cur = conn.cursor()
    cur.execute("SELECT 1")
    print("Database connection successful!")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Database connection failed: {e}")
