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
<<<<<<< HEAD:TER-base-donnée/Netoyage_Importation/LoadFile.py
    import_csv_mongo(db_url, db_name, csv_file_path)
=======
    import_csv_mongo(db_url, db_name, merged_file)
    import_csv_mongo(db_url, db_name, merged_file_rai)
>>>>>>> a334fb772fa627016975a6b92ca89cc38f3c6b66:TER-base-donnée/Import/LoadFile.py
