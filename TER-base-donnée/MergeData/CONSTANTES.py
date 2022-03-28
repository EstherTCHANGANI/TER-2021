PATH_META = "../Import/Data/MetaDonnees/*.xlsx"
PATH_FICHES = "../Import/Data/Fiches/*.xlsx"

file_name = "../Import/Data/Fiches/fiches_INA.csv"
fiche_name = "../Import/Data/MetaDonnees/MetaDonnées_INA.csv"
merged_file = "./files/Fiches_INA_merged.csv"
merged_file_rai = "./files/Fiches_RAI_merged.csv"
FICHES_RAIUNO_20 = "fiches_RAIUNO 20.xlsx"
FICHES_RAIUNO_1330 = "Fiches RAIUNO 1330.xlsx"
META_DONNEES_RAI = "MetaDonnées_RAI.xlsx"
FICHES_INA = "fiches_INA.xlsx"
META_DONNEES_INA = "MetaDonnées_INA.xlsx"

UNNAMED = "Unnamed"
champs = "ID_document"

COLONNES_METADONNEES_INNA = {"ID Notice": "ID_document",
                             "Titre propre": "document_title",
                             "Titre collection": "title_programme",
                             "Date de diffusion": "day_airing",
                             "Image": "image_title",
                             "Personnalité": "celebrity",
                             "Événement": "event",
                             "Lieu": "location",
                             "Illustration": "illustration",
                             "Date et lieu de consultation": "day_place_consult"
                             }

COLONNES_METADONNEES_INNA_ARTE = {"Demonstration": "ID_document",
                                  "Titre propre": "document_title",
                                  "Titre collection": "title_programme",
                                  "Date de diffusion": "day_airing",
                                  "Image": "image_title",
                                  "Pérsonnalité": "celebrity",
                                  "Événement": "event",
                                  "Lieu": "location",
                                  "Illustration": "illustration"
                                  }

COLONNES_METADONNEES_INNA_ARTE_NIK = {"ID Notice": "ID_document",
                                      "Titre propre": "document_title",
                                      "Titre collection": "title_programme",
                                      "Date de diffusion": "day_airing",
                                      "Image": "image_title",
                                      "Pérsonnalité": "celebrity",
                                      "Événement": "event",
                                      "Lieu": "location",
                                      "Illustration": "illustration"
                                      }

COLONNES_FICHES_INNA = {"ID_notice": "ID_document",
                        "Titre_propre": "document_title",
                        "Titre_collection": "title_programme",
                        "Titre_programme": "program_details",
                        "France 2": "channel",
                        "Date_de_diffusion": "day_airing",
                        "Jour": "day",
                        "Statut_de_diffusion": "airing_state",
                        "Heure_de_diffusion": "time_start",
                        "Heure_de_fin_de_diffusion": "time_stop",
                        "Duree": "duration",
                        "Genre": "type",
                        "Generique": "credits",
                        "Descripteurs": "descriptors",
                        "Chapeau": "introductory_summary",
                        "Societe_de_programmes": "airing_company",
                        "Producteurs": "producers",
                        "Extension_geographique": "range",
                        "Fonds": "collection",
                        "Titre_materiel": "title_material"
                        }

#
COLONNES_METADONNEES_RAI_1330 = {"ID Notice": "ID_document",
                                 "Service Title": "document_title",
                                 "Edition of TG News": "title_programme",
                                 "Trasmission Date": "day_airing",
                                 "Time Start": "time_start",
                                 "Time Stop": "time_stop",
                                 "Image": "image_title",
                                 "Celebrity": "celebrity",
                                 "Event": "event",
                                 "Location": "location",
                                 "Illustration": "illustration",
                                 "Date and Place of Research": "day_place_consult",
                                 "Note ": "note"
                                 }

COLONNES_FICHES_RAIUNO_1330 = {"Documento": "document",
                               "Titolo Programma": "title_programme",
                               "Titolo Sequenza/Servizio": "document_title",
                               "Canale Trasmissione": "channel",
                               "Data Trasmissione": "day_airing",
                               "Durata": "duration",
                               "Contenuto Audio": "content_audio",
                               "Contenuto Video": "content_video",
                               "Identificatore Teca": "ID_document",
                               "Note ": "note",
                               "Time Start": "time_start",
                               "Time Stop": "time_stop"
                               }

COLONNES_METADONNEES_RAI_2000 = {"ID Notice": "ID_document",
                                 "Service Title": "document_title",
                                 "Edition of TG News": "title_programme",
                                 "Trasmission Date": "day_airing",
                                 "Time code start": "time_start",
                                 "Time code stop": "time_stop",
                                 "Image": "image_title",
                                 "Celebrity": "celebrity",
                                 "Event": "event",
                                 "Location": "location",
                                 "Illustration": "illustration",
                                 "Date and Place of Research": "day_place_consult"
                                 }

COLONNES_FICHES_RAIUNO_20 = {"Documento": "document",
                             "Titolo Programma": "title_programme",
                             "Titolo Sequenza/Servizio": "document_title",
                             "Canale Trasmissione": "channel",
                             "Data Trasmissione": "day_airing",
                             "Durata": "duration",
                             "Contenuto Audio": "content_audio",
                             "Contenuto Video": "content_video",
                             "Identificatore Teca": "ID_document",
                             "Time Start": "time_start",
                             "Time Stop": "time_stop"
                             }