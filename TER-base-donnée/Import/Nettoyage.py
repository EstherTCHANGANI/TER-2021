from numpy.core.fromnumeric import transpose
import pandas as pd
import glob
import numpy as np
from CONSTANTES import *


# Convertit les donnnées d'un fichier XLSX au format JSON
# ----------------------------------------------------------------------------
def xlsx_to_csv(filename):
    """
    Fonction convertissant un fichier XLSX en CSV.
    @param (str) chemin_fichier_xlsx : Chemin du fichier XLSX.
    """

    liste_feuilles = []
    # Récupération des données du fichier XLSX et des noms de feuilles

    # Chargment du fichier .xlsx
    donnees_xlsx = pd.ExcelFile(filename)

    # Liste des noms des feuilles
    liste_nom_feuilles = donnees_xlsx.sheet_names

    for nom_feuille in liste_nom_feuilles:
        # Lecture du fichier xlsx
        excel_data_df = pd.read_excel(filename, nom_feuille,)
        #excel_data_df.drop(excel_data_df.columns[excel_data_df.columns.str.contains('unnamed',case = False)],axis = 1, inplace = True)

        if find_column_name(excel_data_df, UNNAMED) and "Fiches_RAIUNO" not in filename:
            excel_data_df = pd.read_excel(filename, nom_feuille, header=1)

        #
        if (META_DONNEES_INA in filename):
            if nom_feuille == "ARTE":
                excel_data_df = excel_data_df.rename(
                    columns=COLONNES_METADONNEES_INNA_ARTE)

                excel_data_df = excel_data_df[list(
                    COLONNES_METADONNEES_INNA_ARTE.values())]

            elif nom_feuille == "ARTE_Nikolina":
                excel_data_df = excel_data_df.rename(
                    columns=COLONNES_METADONNEES_INNA_ARTE_NIK)

                excel_data_df = excel_data_df[list(
                    COLONNES_METADONNEES_INNA_ARTE_NIK.values())]

            else:
                excel_data_df = excel_data_df.rename(
                    columns=COLONNES_METADONNEES_INNA)
                excel_data_df = excel_data_df[list(
                    COLONNES_METADONNEES_INNA.values())]

        #
        elif (FICHES_INA in filename):
            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_INNA)
            excel_data_df = excel_data_df[list(COLONNES_FICHES_INNA.values())]

        #
        elif (META_DONNEES_RAI in filename):
            
            
            if nom_feuille == "TG1 2000":
                new_colunm_index = list(COLONNES_METADONNEES_RAI_2000.keys())
                excel_data_df = excel_data_df.reindex(columns=new_colunm_index)
                excel_data_df = excel_data_df.rename(
                    columns=COLONNES_METADONNEES_RAI_2000)
                excel_data_df = excel_data_df[list(
                    COLONNES_METADONNEES_RAI_2000.values())]

            else:
                excel_data_df = excel_data_df.rename(
                    columns=COLONNES_METADONNEES_RAI_1330)
                excel_data_df = excel_data_df[list(
                    COLONNES_METADONNEES_RAI_1330.values())]
            
            i = 0
            nb_ligne = excel_data_df.shape[0]
            
            Id_Notices = []
            Service_Title = []
            Edition_of_TG_News = []
            Trasmission_Date = []
            Time_start = []
            Time_stop = []
            Image = []
            Celebrity =[]
            Event = []
            Location = []
            Illustration = []
            Date_and_Place_of_Research = []
            while i < nb_ligne: 
                id_notice = excel_data_df["ID_notice"][i]

                if not pd.isna(id_notice):
                    Id_Notices.append(id_notice)
                    Service_Title.append(excel_data_df["Service_Title"][i])
                    Edition_of_TG_News.append(excel_data_df["Edition_of_TG_News"][i])
                    Trasmission_Date.append(excel_data_df["Trasmission_Date"][i])
                    Time_start.append(excel_data_df["Time_start"][i])
                    Time_stop.append(excel_data_df["Time_stop"][i])
                
                    str_images = ""
                    str_celebrity = ""
                    str_event = ""
                    str_location = ""
                    str_illustration = ""
                    str_date_and_Place_of_Research = ""
                    i += 1
                    while pd.isna(i < nb_ligne and excel_data_df["ID_notice"][i]):
                        str_images = str_images + "|" + str(excel_data_df["Image"][i])
                        str_celebrity = str_celebrity + "|" + str(excel_data_df["Celebrity"][i])
                        str_event = str_event + "|" + str(excel_data_df["Event"][i])
                        str_location = str_location + "|" + str(excel_data_df["Location"][i])
                        str_illustration = str_illustration + "|" + str(excel_data_df["Illustration"][i])
                        str_date_and_Place_of_Research = str_date_and_Place_of_Research + "|" + str(excel_data_df["Date_and_Place_of_Research"][i])
                        i += 1
                     
                    Image.append(str_images)
                    Celebrity.append(str_celebrity)
                    Event.append(str_event)
                    Location.append(str_location)
                    Illustration.append(str_illustration)
                    Date_and_Place_of_Research.append(str_date_and_Place_of_Research)
                
                else:
                    i += 1
        
            excel_data_df = pd.DataFrame({"ID_notice" : Id_Notices,
                                          "Service_Title" : Service_Title,
                                          "Edition_of_TG_News" : Edition_of_TG_News,
                                          "Trasmission_Date" : Trasmission_Date,
                                          "Time_start" : Time_start,
                                          "Time_stop" : Time_stop,
                                          "Image" : Image,
                                          "Celebrity" : Celebrity,
                                          "Event" : Event,
                                          "Location" : Location,
                                          "Illustration" : Illustration,
                                          "Date_and_Place_of_Research" : Date_and_Place_of_Research
                                          })            
            
        #
        elif (FICHES_RAIUNO_20 in filename):
            if nom_feuille in ("TG1 2000", "TG1 EDIZIONE 2000"):
                excel_data_df = pd.read_excel(filename, nom_feuille, header=1)
            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_RAIUNO_20)

            excel_data_df = excel_data_df[list(
                COLONNES_FICHES_RAIUNO_20.values())]

        #
        elif (FICHES_RAIUNO_1330 in filename):
            if nom_feuille == "Tg1 edizione1330":
                excel_data_df.drop("Titolo Puntata", axis=1, inplace=True)

            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_RAIUNO_1330)

            excel_data_df = excel_data_df[list(
                COLONNES_FICHES_RAIUNO_1330.values())]

        # Défussionne les lignes fusionnés
        #excel_data_df = excel_data_df.fillna(method='ffill', axis=0)
        """if (META_DONNEES_RAI in filename):
             print(excel_data_df)
             excel_data_df = excel_data_df.dropna(
                subset=['ID_notice']
            )"""
        """colonnes = excel_data_df.columns
        if (colonnes[0] == "ID_notice"):
            for col in colonnes:  # All columns
                pprow = 0
                prow = 1
                for row in excel_data_df[1:].iterrows():  # All rows, except first
                    if pd.isnull(excel_data_df.loc[prow, colonnes[0]]):  # If this cell is empty all in the same row too.
                        print(row)
                        continue
                    elif pd.isnull(excel_data_df.loc[prow, col]) and pd.isnull(excel_data_df.loc[row[0], col]):  # If a cell and next one are empty, take previous valor. 
                        excel_data_df.loc[prow, col] = excel_data_df.loc[pprow, col]
                    pprow = prow
                    prow = row[0]"""
        liste_feuilles.append(excel_data_df)

    # Concatène tous les datasets (feuilles -> datasets)
    df = pd.concat(liste_feuilles, ignore_index=True)

    # Supprime les lignes entièrement vide
    df.dropna(
        axis=0,
        how='all',
        thresh=None,
        subset=None,
        inplace=True
    )

    # Supprime les doublons
    df = df.drop_duplicates(subset=None)

    # Création du fichier .csv
    df.to_csv(f"{filename.split('.')[0]}.csv", index=False, encoding="utf-8")


def find_column_name(data_set, column_name):
    bool_columns_values = data_set.columns.str.match(column_name)

    return True in bool_columns_values


def clean_file(path_fiche):
    for filename in glob.glob(path_fiche):
        xlsx_to_csv(filename)


if __name__ == "__main__":
    clean_file(PATH_META)
    clean_file(PATH_FICHES)