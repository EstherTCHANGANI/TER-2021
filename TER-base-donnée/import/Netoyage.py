import pandas as pd
import glob

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
        excel_data_df = pd.read_excel(filename, nom_feuille)

        if delete_specific_row(excel_data_df, 'Unnamed'):
            excel_data_df = pd.read_excel(filename, nom_feuille, header=1)

        # Défussionne les lignes fusionnés
        excel_data_df = excel_data_df.fillna(method='ffill', axis=0)
        """#print(excel_data_df.filter(like=UNNAMED, axis=1))
        print(excel_data_df.loc[:,excel_data_df.columns.str.contains(UNNAMED)])
        empty_cols = [col for col in excel_data_df.columns if UNNAMED in excel_data_df[col]]
        print(empty_cols)
        """
        excel_data_df= excel_data_df.dropna(how='all', axis='columns')
        liste_feuilles.append(excel_data_df)

    # Concatène tous les datasets (feuilles -> datasets)
    df = pd.concat(liste_feuilles, ignore_index=True)
    
    """empty_cols = [col for col in df.columns if df[col].str.match(UNNAMED)]
    print(empty_cols)
    # Drop these columns from the dataframe
    df.drop(empty_cols,
            axis=1,
            inplace=True)
            """
    
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

    # print(df.columns.str.match("Unnamed"))
    # Création du fichier .csv
    df.to_csv(f"{filename.split('.')[0]}.csv", index=False, encoding="utf-8")


def clean_file(path_fiche):
    for filename in glob.glob(path_fiche):
        xlsx_to_csv(filename)


def delete_specific_row(data_set, column_name):
    bool_columns_values = data_set.columns.str.match(column_name)

    return True in bool_columns_values


if __name__ == "__main__":
    clean_file(PATH_META)
    clean_file(PATH_FICHES)
