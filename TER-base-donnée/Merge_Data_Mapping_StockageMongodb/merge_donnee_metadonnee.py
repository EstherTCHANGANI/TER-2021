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
<<<<<<< HEAD:TER-base-donnée/Merge_Data_Mapping_StockageMongodb/merge_donnee_metadonnee.py
    data2[champs] = data2[champs].astype(float)
=======
    data[champs] = data[champs].astype("string")
>>>>>>> a334fb772fa627016975a6b92ca89cc38f3c6b66:TER-base-donnée/MergeData/merge_donnee_metadonnee.py

    # using merge function by setting how='inner'

    output1 = pd.merge(data, meta_data,
                       on=champs,
                       how='inner')

    output1.to_csv(merged_file, index=False)


if __name__ == "__main__":
<<<<<<< HEAD:TER-base-donnée/Merge_Data_Mapping_StockageMongodb/merge_donnee_metadonnee.py
    champs = "ID_notice"
    merge_data_mongodb(file_name, fiche_name, champs)
=======
    merge_data_mongodb(file_name, fiche_name, champs)
>>>>>>> a334fb772fa627016975a6b92ca89cc38f3c6b66:TER-base-donnée/MergeData/merge_donnee_metadonnee.py
