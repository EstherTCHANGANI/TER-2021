PATH_META = "../Import/Data/MetaDonnees/*.xlsx"
PATH_FICHES = "../Import/Data/Fiches/*.xlsx"

file_INA = "../Import/Data/Fiches/fiches_INA.csv"
MData_INA = "../Import/Data/MetaDonnees/MetaDonnees_INA.csv"
file_RAI_20="../Import/Data/Fiches/fiches_RAIUNO 20.csv"
file_RAI_13="../Import/Data/Fiches/Fiches RAIUNO 1330.csv"
MData_RAI="../Import/Data/MetaDonnees/MetaDonnees_RAI.csv"
CROBORA_WEB_FR="../Import/Data/MetaDonnees/Catalogue Rudy.csv"


final_INA_file = "./files/Fiches_INA_final.csv"
final_rai_file = "./files/Fiches_RAI_final.csv"
Webfr_subject_file = "./files/WEBfr_subject.csv"
Webfr_CROBORA_file = "./files/WEBfr_CROBORA.csv"

UNNAMED = "Unnamed"
champs = "ID_document"

db_url = "mongodb://localhost:27017"
db_name = "admin"
db_collection_file ="TER"

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

COLUMNS_TRANSFER_WEBFR_CroToArc = [ "ID_document",
                                    "document_title",
                                    "channel",
                                    "day_airing",
                                    "time_start",
                                    "time_stop",
                                    "date_pace_consult",
                                    "link_to_video",
                                    "type",
                                    "subscribers",
                                    "language",
                                    "comments_authorization",
                                    "likes",
                                    "dislikes",
                                    "views",
                                    "other_fiction",
                                    "comments",
                                    "platform"
                                    ]

COLUMNS_WEBFR_TODROP_Cro = ["channel",
                            "time_start",
                            "time_stop",
                            "date_pace_consult",
                            "link_to_video",
                            "type",
                            "subscribers",
                            "language",
                            "comments_authorization",
                            "likes",
                            "dislikes",
                            "views",
                            "other_fiction",
                            "comments",
                            "platform"]