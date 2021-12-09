FICHES_RAIUNO_20 = "fiches_RAIUNO_20.xlsx"
FICHES_RAIUNO_1330 = "Fiches_RAIUNO_1330.xlsx"
META_DONNEES_RAI = "MetaDonnees_RAI.xlsx"
FICHES_INA = "Fiches_INA.xlsx"
META_DONNEES_INA = "MetaDonnees_INA.xlsx"

# Configuration de fichier de donnéé avec le fichier de ces methadonnée en  specifiant le champs ou on veut faire le merge
file_name = "Data/Fiches/Fiches_INA.csv"
fiche_name = "MetaDonnees_INA.csv"
champs = "ID Notice"

# configuration de la base de donnée
db_url = "mongodb://localhost:27017"
db_name = "TER"

# configuration des fiches a merger dans la base
merged_file = "/MergeData/files/Fiches_INA_merged.csv"
merged_file_rai = "/MergeData/files/Fiches_RAI_merged.csv"
