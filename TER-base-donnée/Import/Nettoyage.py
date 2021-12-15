import pandas as pd
import glob

from openpyxl import load_workbook

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
        print(nom_feuille)
        # Lecture du fichier xlsx
        excel_data_df = pd.read_excel(filename, nom_feuille)

        if find_column_name(excel_data_df, UNNAMED):
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

            #
        elif (FICHES_RAIUNO_20 in filename):
            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_RAIUNO_20)
            excel_data_df = excel_data_df[list(COLONNES_FICHES_RAIUNO_20.values())]


        #
        elif (FICHES_INA in filename):
            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_INNA)
            excel_data_df = excel_data_df[list(COLONNES_FICHES_INNA.values())]
            #
        elif (FICHES_RAIUNO_1330 in filename):
            print(excel_data_df.columns)
            if nom_feuille == "Tg1 edizione1330":
                excel_data_df.drop("Titolo Puntata", axis=1, inplace=True)

            excel_data_df = excel_data_df.rename(
                columns=COLONNES_FICHES_RAIUNO_1330)
            excel_data_df = excel_data_df[list(
                COLONNES_FICHES_RAIUNO_1330.values())]

        # Défussionne les lignes fusionnés
        excel_data_df = excel_data_df.fillna(method='ffill', axis=0)

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
    df["Unnamed: 12"] = None
    df.dropna(
        axis=1,
        how='all',
        thresh=None,
        subset=None,
        inplace=True
    )
    df["Unnamed: 12"] = None
    df["Unnamed"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 1"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 14"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 4"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 5"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 7"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 2"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 3"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 6"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 8"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 10"] = None
    df.dropna(axis=1, how='all', inplace=True)
    df["Unnamed: 11"] = None

    df.drop(df.filter(regex="Unname"), axis=1, inplace=True)
    # df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
    # Supprime les doublons
    df = df.drop_duplicates(subset=None)

    # Création du fichier .csv
    df.to_csv(f"{filename.split('.xlsx')[0]}.csv", index=False, encoding="utf-8")


def find_column_name(data_set, column_name):
    bool_columns_values = data_set.columns.str.match(column_name)

    return True in bool_columns_values


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
    wb.save(filename)


def eliminate_duplicate_lines(file):
    sheets = []
    donnees_xlsx = pd.ExcelFile(file)
    sheets_name = donnees_xlsx.sheet_names
    for sheet in sheets_name:
        excel_data_df = pd.read_excel(file, sheet)
        excel_data_df = excel_data_df.fillna(method='ffill', axis=0)
        excel_data_df = excel_data_df.drop_duplicates(subset=None)
        sheets.append(excel_data_df)


def clean_file(path_fiche):

    for filename in glob.glob(path_fiche):
        xlsx_to_csv(filename)


if __name__ == "__main__":
    clean_file(PATH_META)
    clean_file(PATH_FICHES)
