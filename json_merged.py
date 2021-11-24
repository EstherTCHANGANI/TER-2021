import csv
import json
import pandas as pd
import sys, getopt, pprint
from pymongo import MongoClient
#CSV to JSON Conversion
csvfile = open('fiche_merged.csv', 'r')
jsonfile = open('fiche_merged.json', 'a')
reader = csv.DictReader( csvfile )
header= [ "id_notice", "titre_collection", "Titre_propre", "Titre_collection", "Titre_programme", "France_2", "Date_de_diffusion", "Jour", "Statut_de_diffusion", "Heure_de_diffusion",	"Heure_de_fin_de_diffusion", "Duree", "Genre", "Generique" ,"Descripteurs" "Chapeau", "Societe_de_programmes" ,"Producteurs" "Extension_geographique" ,"Fonds" ,"Titre_materiel"]

#fieldnames=header
output=[]
for each in reader:
    row={}
    for field in header:
        row[field]=each[field]
    output.append(row)

json.dump(output, jsonfile, indent=None, sort_keys=False , encoding="UTF-8")
mongo_client=MongoClient() 
db=mongo_client.october_mug_talk
db.segment.drop()
data=pd.read_csv('fiche_merged.json', error_bad_lines=0)
df = pd.DataFrame(data)
records = csv.DictReader(df)
db.segment.insert(records)