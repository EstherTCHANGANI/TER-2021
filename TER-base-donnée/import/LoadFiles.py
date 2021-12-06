import glob
import json
import pandas as pd
import os
import argparse
from openpyxl import load_workbook
from pymongo import MongoClient

parser = argparse.ArgumentParser(description='Load data into mongoDB collection')
parser.add_argument('dataPath', metavar='dataPath', type=str,
                    help='The path of the directory containing the data')
parser.add_argument('--outputPath', type=str, default="C:/Users/ibrah/Documents/projet_ter/base_donnee/sprint1_29-11"
                                                      "-2021/source/fiche", nargs="?",
                    help='The path of the directory where the CSV files will be stored')
parser.add_argument("--mongoUrl", type=str, default="mongodb://localhost:27017",
                    help="URL of the mongoDB server")
parser.add_argument("--mongoDatabase", type=str, default="admin",
                    help="Name of the mongoDB data base")
parser.add_argument("--clear", type=bool, default=False,
                    help="Clear CSV files after run")


def csv_from_Excel(file_name):
    """
    Fonction convertissant un fichier XLSX en CSV.

    @param (str) file_name : Chemin du fichier XLSX.
    """
    liste_feuilles = []
    # Récupération des données du fichier XLSX et des noms de feuilles
    donnees_xlsx = pd.ExcelFile(file_name)
    liste_nom_feuilles = donnees_xlsx.sheet_names

    for nom_feuille in liste_nom_feuilles:
        # Lecture du fichier xlsx
        excel_data_df = pd.read_excel(file_name, nom_feuille)

        # Défussionne les lignes fusionnés
        excel_data_df = excel_data_df.fillna(method='ffill', axis=0)

        liste_feuilles.append(excel_data_df)

    df = pd.concat(liste_feuilles, ignore_index=True)
    df.to_csv(f"{file_name.split('.')[0]}.csv", index=False)


# Fontion qui permet de nettoyer les metadonnées
# def clean_files_unnamed(excel_file):
#     all_sheets = pd.read_excel(excel_file)
#     with open(excel_file, 'r') as fin:
#         lines = fin.read().splitlines(True)
#         if lines[0].startswith("Unnamed"):
#             fin.close()
#             with open(excel_file, 'w') as fout:
#                 fout.writelines(lines[1:])
#                 fout.close()

def file_data(dir_path):
    for filename in glob.glob(dir_path):
        print(filename)
        csv_from_Excel(filename)


def elimanate_extra_space(filename):
    wb = load_workbook(filename, read_only=False)
    # Récupération des données du fichier XLSX et des noms de feuilles
    donnees_xlsx = pd.ExcelFile(wb)
    liste_nom_feuilles = donnees_xlsx.sheet_names
    ws = wb[liste_nom_feuilles]  # ws is now an IterableWorksheet
    for row in ws.rows:
        for cell in row:
            print(cell.value)
            if isinstance(cell.value, str):
                cell.value = cell.value.strip()
                print("========================")
                print(cell.value)
    wb.save(filename)


def eliminate_duplicate_lines(filename):
    data = pd.read_excel(filename)
    data = data.drop_duplicates(subset=None)
    data.to_excel(filename)


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
            csv_from_Excel(filename)
            import_csv_mongo(args.mongoUrl, args.mongoDatabase, args.outputPath)

    if args.clear:
        os.rmdir(args.outputPath)
