# reading two csv files
from pandas import concat

from CONSTANTES import *

import pandas
import pandas as pd


def merge_data_mongodb(file_name_fiche, file_name_meta, champs):
    # au cas de besoin on peux renomer le champs qu'on veux sortir dans les fichiers
    # exemple fiche ina contient ID Notice et metadonnée Ina contient le meme champs avec une ecriture differente
    # d'ou on peux renomer le champs au niveau de code au cas de besoin d'un champs specifique
    # df = f1.rename(columns={'ID_notice': 'ID Notice'})
    file_name_fiche_2 = pd.read_csv('../Import/Data/MetaDonnees/catalogo .csv')

    frames = [pd.read_csv(file_name_fiche), pd.read_csv(file_name_meta)]
    result = concat(frames, ignore_index=True)
    # using merge function by setting how='inner'

    output1 = pd.merge(result, file_name_fiche_2,
                       on="ID Notice",
                       how='inner')
    output1.to_csv(merged_file_rai, index=False)
    # f3 = pandas.merge(f1, f2, on='ID Notice', how='left')
    # for c in f1.columns:
    #     for g in f2.columns:
    #         f3 = f1[[c]].merge(f2[[g]], on="ID Notice",
    #                            how="left")


if __name__ == "__main__":
    file_name = "/Import/Data/Fiches/fiches_RAIUNO_20.csv "
    fiche_name = "/Import/Data/Fiches/Fiches_RAIUNO_1330.csv"
    merge_data_mongodb(file_name, fiche_name,
                       champs)
