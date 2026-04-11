from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus

# encoding password
password = quote_plus("#de455&4kwIl^84")

# creating engine
DATABASE_URL = f"mysql+pymysql://root:{password}@localhost/ngo_resource_db"
engine = create_engine(DATABASE_URL)

# creating base class
Base = declarative_base()

# session template
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


