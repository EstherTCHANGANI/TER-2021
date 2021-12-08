from CONSTANTES import *
import argparse
import json

import pandas
import pandas as pd
import os
from pymongo import MongoClient


def merge_data_mongodb(file_name_fiche, file_name_meta, champ):
    f1 = pandas.read_csv(file_name_fiche)
    f2 = pandas.read_csv(file_name_meta)

    # au cas de besoin on peux renomer le champs qu'on veux sortir dans les fichiers
    # exemple fiche ina contient ID Notice et metadonnée Ina contient le meme champs avec une ecriture differente
    # d'ou on peux renomer le champs au niveau de code au cas de besoin d'un champs specifique
    # df = f1.rename(columns={'ID_notice': 'ID Notice'})

    output1 = pd.merge(f1, f2,
                       on=champ,
                       how='left')
    output1.to_csv(f"{file_name_fiche.split('.')[0]}.csv", index=False)
    # f3 = pandas.merge(f1, f2, on='ID Notice', how='left')
    # for c in f1.columns:
    #     for g in f2.columns:
    #         f3 = f1[[c]].merge(f2[[g]], on="ID Notice",
    #                            how="left")


if __name__ == "__main__":
    merge_data_mongodb(file_name, fiche_name,"ID Notice")
