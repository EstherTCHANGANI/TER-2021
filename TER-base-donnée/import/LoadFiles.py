import json
import pandas as pd
import os
import argparse

from pymongo import MongoClient

parser = argparse.ArgumentParser(description='Load data into mongoDB collection')
parser.add_argument('dataPath', metavar='dataPath', type=str,
                    help='The path of the directory containing the data')
parser.add_argument('--outputPath', type=str, default="C:/Users/ibrah/Documents/TER/original_fils", nargs="?",
                    help='The path of the directory where the CSV files will be stored')
parser.add_argument("--mongoUrl", type=str, default="mongodb://localhost:27017",
                    help="URL of the mongoDB server")
parser.add_argument("--mongoDatabase", type=str, default="admin",
                    help="Name of the mongoDB data base")
parser.add_argument("--clear", type=bool, default=False,
                    help="Clear CSV files after run")


def csv_from_Excel(dir_path: str, file_name: str, output_dir: str):
    file_path = os.path.join(dir_path, file_name)

    read_file = pd.read_excel(file_path)

    csv_file_name = os.path.join(output_dir, file_name.split(".")[0] + ".csv")
    read_file.to_csv(csv_file_name,
                     encoding='utf-8',
                     index=None,
                     header=True)
    pd.DataFrame(pd.read_csv(csv_file_name))
    return csv_file_name


def sanitize_file(file_path):
    with open(file_path, 'r') as fin:
        lines = fin.read().splitlines(True)
        if lines[0].startswith("Unnamed"):
            fin.close()
            with open(file_path, 'w') as fout:
                fout.writelines(lines[1:])
                fout.close()


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
    args = parser.parse_args()

    if not args.dataPath:
        print("Data path \"" + args.dataPath + "\" does not exists.")
        exit(1)

    if not os.path.isdir(args.outputPath):
        os.mkdir(args.outputPath)

    for filename in os.listdir(args.dataPath):
        if filename.endswith(".xlsx"):
            csv_file = csv_from_Excel(args.dataPath, filename, args.outputPath)
            sanitize_file(csv_file)
            import_csv_mongo(args.mongoUrl, args.mongoDatabase, csv_file)

    if args.clear:
        os.rmdir(args.outputPath)
