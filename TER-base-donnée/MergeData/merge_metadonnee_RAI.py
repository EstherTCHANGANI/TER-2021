# reading two csv files
from pandas import concat

from CONSTANTES import *

import pandas
import pandas as pd


def merge_data_mongodb(file_name_fiche, file_name_meta, champs):
    # Traitement specifique de merge des donnnees avec les metadonnées  du rai
    # soit on peux utiliser cette methode soit en passant  les 3 fichiers dans les arguments
    file_name_fiche_2 = pd.read_csv('../Import/Data/MetaDonnees/Catalogo .csv')

    #On concatene les données entre eux avant de passer au merge des metadonnées
    frames = [pd.read_csv(file_name_fiche), pd.read_csv(file_name_meta)]
    result = concat(frames, ignore_index=True)
    # using merge function by setting how='outer' for not losing data that are not in the both fils
    output1 = pd.merge(result, file_name_fiche_2,
                       on="ID Notice",
                       how='inner')
    output1.to_csv(merged_file_rai, index=False)
    # split the colum Date and place of research to column Date of research and Place of research
    df = pd.read_csv(merged_file_rai)
    # df[['Date_of_Research', 'Place_of_Research']] = df['Date and Place of Research'].str.split(',', 1, expand=True)
    df.to_csv(merged_file_rai)



if __name__ == "__main__":
    file_name = "../Import/Data/Fiches/Fiches_RAIUNO_20.csv"
    fiche_name = "../Import/Data/Fiches/Fiches_RAIUNO_1330.csv"
    merge_data_mongodb(file_name, fiche_name,
                       champs)
