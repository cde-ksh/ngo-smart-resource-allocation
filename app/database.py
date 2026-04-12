import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from urllib.parse import quote_plus

# encoding password
load_dotenv()
db_user = os.getenv("DB_USER")
db_password = quote_plus(os.getenv("DB_PASSWORD"))
db_name = os.getenv("DB_NAME")

# creating engine
DATABASE_URL = f"mysql+pymysql://{db_user}:{db_password}@localhost/{db_name}"
engine = create_engine(DATABASE_URL)

# creating base class
Base = declarative_base()

# session template
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# dependency generator
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


