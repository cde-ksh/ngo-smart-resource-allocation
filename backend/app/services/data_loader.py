import os
import pandas as pd
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# -------- Population --------
file_path = os.path.join(BASE_DIR, "data", "population_sample.json")

with open(file_path) as f:
    population_map = json.load(f)

# -------- Rainfall --------
rainfall_path = os.path.join(BASE_DIR, "data", "rainfall.csv")

rainfall_df = pd.read_csv(rainfall_path)

rainfall_df["District"] = rainfall_df["District"].str.strip().str.lower()
rainfall_df["Avg_rainfall"] = pd.to_numeric(rainfall_df["Avg_rainfall"], errors="coerce")

rainfall_grouped = rainfall_df.groupby("District")["Avg_rainfall"].mean()

rainfall_map = rainfall_grouped.to_dict()