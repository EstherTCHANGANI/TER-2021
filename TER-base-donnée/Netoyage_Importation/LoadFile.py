import json
import pandas as pd
import os
from pymongo import MongoClient
from CONSTANTES import *


def import_csv_mongo(db_url, db_name, csv_file_path):
    coll_name = os.path.split(csv_file_path)[-1].split(".csv")[0]
    print("Importing " + coll_name + "...")
    client = MongoClient(db_url)
    db = client[db_name]
    coll = db[coll_name]
    data = pd.read_csv(csv_file_path)
    payload = json.loads(data.to_json(orient='records'))
    coll.drop()
    coll.insert_many(payload)
    print(coll_name + " imported")


# runs the csv_from_Excel function:
if __name__ == '__main__':
    import_csv_mongo(db_url, db_name, csv_file_path)
