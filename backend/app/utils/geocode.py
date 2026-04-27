def get_coordinates(address):
    import requests
    import time

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": address,
        "format": "json",
        "limit": 1
    }

    headers = {
        "User-Agent": "ngo-allocation-system"
    }

    for _ in range(3):  # retry 3 times
        try:
            response = requests.get(url, params=params, headers=headers, timeout=5)

            if response.status_code != 200:
                time.sleep(1.5)
                continue

            data = response.json()

            if data:
                return float(data[0]["lat"]), float(data[0]["lon"])

        except Exception as e:
            print("Geocoding error:", e)

        time.sleep(1)

    return None, None