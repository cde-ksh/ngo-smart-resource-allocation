import sys
import os
import time

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal
from app.models.volunteers import Volunteers
from app.utils.geocode import get_coordinates

db = SessionLocal()

volunteers = db.query(Volunteers).all()

for v in volunteers:
    if v.latitude is None or v.longitude is None:

        # fallback logic
        district = v.district or ""
        state = v.state or ""

        if not district and not state:
            print(f"Skipping {v.name} (no location data)")
            continue

        full_address = f"{district}, {state}, India"

        lat, lon = get_coordinates(full_address)

        print(f"Trying: {full_address} → {lat}, {lon}")

        if lat is None:
            # fallback to state-only lookup
            full_address = f"{state}, India"
            lat, lon = get_coordinates(full_address)
            print(f"Fallback: {full_address} → {lat}, {lon}")

        if lat is not None:
            v.latitude = lat
            v.longitude = lon
        else:
            print(f"FAILED: {v.name}")

        time.sleep(1.5)
db.commit()
db.close()
