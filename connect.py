import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv
import os

load_dotenv()

def connect_to_rds():
    try:
        connection = psycopg2.connect(
            host=os.getenv("DB_HOST"),
            database=os.getenv("DB_NAME"), #RDS > Databases > Configuration > DB name (if blank, try 'postgres')
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PW"),
            port=os.getenv("DB_PORT"),
        )

        print("RDS connection successful!")

        cursor = connection.cursor()
        cursor.execute("SELECT current_user;")
        print("Current user:", cursor.fetchone()[0])

        connection.close()

    except OperationalError as e:
        print("Failed to connect to RDS!")
        print(e)


if __name__ == "__main__":
    connect_to_rds()