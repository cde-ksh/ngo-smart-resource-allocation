from fastapi import FastAPI, HTTPException, status, Response, Depends
from pydantic import BaseModel
import pymysql
import time 
from sqlalchemy.orm import Session

app = FastAPI()

class volunteer(BaseModel):
    name: str
    phone: str
    skill: str
    availability: str
    location: str

while True:
    try: 
        conn = pymysql.connect(
            host="localhost",
            user="root",
            password="#de455&4kwIl^84",
            database="ngo_resource_db",
            cursorclass=pymysql.cursors.DictCursor
        )
        cursor = conn.cursor()
        print("Database connection was successful!")
        break

    except Exception as error:
        print("Connecting to database failed")
        print("Error:", error)
        time.sleep(5)




