# reading two csv files

from CONSTANTES import *

import pandas as pd


def merge_data_mongodb(file_name_fiche, file_name_meta, champs):
    # au cas de besoin on peux renomer le champs qu'on veux sortir dans les fichiers
    # exemple fiche ina contient ID Notice et metadonnée Ina contient le meme champs avec une ecriture differente
    # d'ou on peux renomer le champs au niveau de code au cas de besoin d'un champs specifique
    # df = f1.rename(columns={'ID_notice': 'ID Notice'})
    data = pd.read_csv(file_name_fiche)
    meta_data = pd.read_csv(file_name_meta)
    # pour eviter les problemes de float et int ca serai mieu de convertir tous les données en float ou int
    data[champs] = data[champs].astype("string")

    # using merge function by setting how='inner'
    # using outer for all data 
    output1 = pd.merge(data, meta_data,
                       on=champs,
                       how='outer')

    output1.to_csv(merged_file, index=False)
    
    # Split column " Date et lieu de consultation" to 'Date de consultation' and 'Lieu de consultation'
    df = pd.read_csv(merged_file)
    df[['Date_de_consultation', 'Lieu_de_consultation']] = df['Date et lieu de consultation'].str.split(' ', 1, expand=True)
    df.to_csv("Fiches_INA_merged.csv")


if __name__ == "__main__":
    merge_data_mongodb(file_name, fiche_name, champs)
