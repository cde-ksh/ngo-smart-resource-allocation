import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from urllib.parse import quote_plus

load_dotenv()

# ================================
# ENV VARIABLES
# ================================

db_user = os.getenv("DB_USER")
db_password = quote_plus(
    os.getenv("DB_PASSWORD", "")
)
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")

# ================================
# DATABASE URL
# ================================

DATABASE_URL = (
    f"mysql+pymysql://{db_user}:{db_password}"
    f"@{db_host}/{db_name}"
)

# ================================
# ENGINE
# ================================

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# ================================
# BASE CLASS
# ================================

Base = declarative_base()

# ================================
# SESSION
# ================================

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# ================================
# DB DEPENDENCY
# ================================

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()