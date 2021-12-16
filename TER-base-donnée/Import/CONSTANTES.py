# Configuration des liens des dosisers vers les dossiers
# On peux utiliser que path meta si on a une seule type de fichier
# On a fait les deux  fichier jusre pou diviser entre les données et leur metadonnées
# Le but est d'avoir un netoyage bien reussi pour les fichiers
# Etape obligatoire (minimum avoir un des deux )

PATH_META = "./Data/MetaDonnees/*.xlsx"
PATH_FICHES = "./Data/Fiches/*.xlsx"

# Configuration de La base de donnée
# Etape obligatoire

db_url = "mongodb://localhost:27017"
db_name = "admin"

# Configuration ou renomage des fichiers
# Cette etape n'est pas obligatoire
# Le code est automatisé il peut convertir tous les fichiers excel
# Cette etape utilisé si on  utilise  toujours les memes fichiers mais on veut faire des modifications
FICHES_RAIUNO_20 = "fiches_RAIUNO_20.xlsx"
FICHES_RAIUNO_1330 = "Fiches_RAIUNO_1330.xlsx"
META_DONNEES_RAI = "MetaDonnees_RAI.xlsx"
FICHES_INA = "Fiches_INA.xlsx"
META_DONNEES_INA = "MetaDonnees_INA.xlsx"

# Configuration de fichier de donnéé avec le fichier de ces methadonnée en  specifiant le champs ou on veut faire le merge
merged_file = "../MergeData/files/Fiches_INA_merged.csv"
merged_file_rai = "../MergeData/files/Fiches_RAI_merged.csv"
fiche_name = "MetaDonnees_INA.csv"
champs = "ID Notice"

# configuration de la base de donnée
db_url = "mongodb://localhost:27017"
db_name = "TER"
# Variable
UNNAMED = "Unnamed"

# Renomage des champs des fichiers qu'on actuellement
# Cette etape va faciliter le merge et la liason entre les données et les metadonnées
COLONNES_METADONNEES_INNA = {"ID Notice": "ID_notice",
                             "Titre propre": "Titre_propre",
                             "Titre collection": "Titre_collection",
                             "Date de diffusion": "Date de diffusion",
                             "Image": "Image",
                             "Personnalité": "Personnalite",
                             "Événement": "Evenement",
                             "Lieu": "Lieu",
                             "Illustration": "Illustration",
                             "Date et lieu de consultation": "Date et lieu de consultation"
                             }

COLONNES_METADONNEES_INNA_ARTE = {"Demonstration": "ID_notice",
                                  "Titre propre": "Titre_propre",
                                  "Titre collection": "Titre_collection",
                                  "Date de diffusion": "Date de diffusion",
                                  "Image": "Image",
                                  "Pérsonnalité": "Personnalite",
                                  "Événement": "Evenement",
                                  "Lieu": "Lieu",
                                  "Illustration": "Illustration"
                                  }

COLONNES_METADONNEES_INNA_ARTE_NIK = {"ID Notice": "ID_notice",
                                      "Titre propre": "Titre_propre",
                                      "Titre collection": "Titre_collection",
                                      "Date de diffusion": "Date de diffusion",
                                      "Image": "Image",
                                      "Pérsonnalité": "Personnalite",
                                      "Événement": "Evenement",
                                      "Lieu": "Lieu",
                                      "Illustration": "Illustration"
                                      }

COLONNES_FICHES_INNA = {"ID_notice": "ID_notice",
                        "Titre_propre": "Titre_propre",
                        "Titre_collection": "Titre_collection",
                        "Titre_programme": "Titre_programme",
                        "France 2": "Chaine",
                        "Date_de_diffusion": "Date_de_diffusion",
                        "Jour": "Jour",
                        "Statut_de_diffusion": "Statut_de_diffusion",
                        "Heure_de_diffusion": "Heure_de_diffusion",
                        "Heure_de_fin_de_diffusion": "Heure_de_fin_de_diffusion",
                        "Duree": "Duree",
                        "Genre": "Genre",
                        "Generique": "Generique",
                        "Descripteurs": "Descripteurs",
                        "Chapeau": "Chapeau",
                        "Societe_de_programmes": "Societe_de_programmes",
                        "Producteurs": "Producteurs",
                        "Extension_geographique": "Extension_geographique",
                        "Fonds": "Fonds",
                        "Titre_materiel": "Titre_materiel"
                        }

#
COLONNES_METADONNEES_RAI_1330 = {"ID Notice": "ID Notice",
                                 "Service Title": "Service_Title",
                                 "Edition of TG News": "Edition_of_TG_News",
                                 "Trasmission Date": "Trasmission_Date",
                                 "Time Start": "Time_start",
                                 "Time Stop": "Time_stop",
                                 "Image": "Image",
                                 "Celebrity": "Celebrity",
                                 "Event": "Event",
                                 "Location": "Location",
                                 "Illustration": "Illustration",
                                 "Date and Place of Research": "Date_and_Place_of_Research",
                                 "Note ": "Note"
                                 }

COLONNES_FICHES_RAIUNO_1330 = {"Documento": "Documento",
                               "Titolo Programma": "Titolo programma",
                               "Titolo Sequenza/Servizio": "Titolo sequenza/servizio",
                               "Canale Trasmissione": "Canale Trasmissione",
                               "Data Trasmissione": "Data Trasmissione",
                               "Durata": "Durata",
                               "Contenuto Audio": "Contenuto Audio",
                               "Contenuto Video": "Contenuto Video",
                               "Identificatore Teca": "ID Notice",
                               "Note ": "Note",
                               "Time Start": "Time Start",
                               "Time Stop": "Time Stop"
                               }

COLONNES_METADONNEES_RAI_2000 = {"ID Notice": "ID Notice",
                                 "Service Title": "Service_Title",
                                 "Edition of TG News": "Edition_of_TG_News",
                                 "Trasmission Date": "Trasmission_Date",
                                 "Time code start": "Time_start",
                                 "Time code stop": "Time_stop",
                                 "Image": "Image",
                                 "Celebrity": "Celebrity",
                                 "Event": "Event",
                                 "Location": "Location",
                                 "Illustration": "Illustration",
                                 "Date and Place of Research": "Date_and_Place_of_Research"
                                 }

COLONNES_FICHES_RAIUNO_20 = {"Documento": "Documento",
                             "Titolo Programma": "Titolo Programma",
                             "Titolo Sequenza/Servizio": "Titolo Sequenza/servizio",
                             "Canale Trasmissione": "Canale Trasmissione",
                             "Data Trasmissione": "Data Trasmissione",
                             "Durata": "Durata",
                             "Contenuto Audio": "Contenuto Audio",
                             "Contenuto Video": "Contenuto Video",
                             "Identificatore Teca": "ID Notice",
                             }
