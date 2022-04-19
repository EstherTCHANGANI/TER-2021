from CONSTANTES_archivesLoad import *
import pandas as pd

def link_data(file_name_fiche):
    #On concatene les données entre eux avant de passer au merge des metadonnées
    meta_df = pd.read_csv(file_name_fiche)

    meta_df["ID_document"] = meta_df["link_to_video"] + meta_df["time_start"] + meta_df["time_stop"]
    meta_df["ID_document"] = meta_df["ID_document"].replace(regex=["/"], value=["_"])
    meta_df["ID_document"] = meta_df["ID_document"].replace(regex=["\\n"], value=[""])

    archive_df = meta_df[COLUMNS_TRANSFER_WEBFR_CroToArc].copy()
    meta_df = meta_df.drop(columns=COLUMNS_WEBFR_TODROP_Cro)
    archive_df = archive_df.drop_duplicates()
    link_images(meta_df,archive_df)

    #count(meta_df,archive_df,0,result)
    print("files formated : " + str(len(meta_df["ID_document"])))
    meta_df = meta_df.to_csv(Webfr_CROBORA_file, index=False)
    print("files formated : " + str(len(archive_df["ID_document"])))
    archive_df = archive_df.to_csv(Webfr_subject_file, index=False)
    

def link_images(images_df,final_df):
    final_df["images"]=""
    final_df.reset_index()
    for index,row in final_df.iterrows():
        list_images = images_df[images_df["ID_document"]==row["ID_document"]]
        for indexM,rowM in list_images.iterrows():
            final_df.at[index,"images"]+= rowM["image_title"]+", "
        final_df.at[index,"images"]=final_df.at[index,"images"][:-2]

def count(meta_df,archive_df,option,result):
    if (option==1 or option==2):
        for el in meta_df["ID_document"].drop_duplicates():
            solo=True
            for elF in archive_df["ID_document"]:
                if el==elF:
                    solo=False
            if solo:
                print(el + str(type(el)))
    if option==2:
        for el in archive_df["ID_document"]:
            solo=True
            for elF in meta_df["ID_document"].drop_duplicates():
                if el==elF:
                    solo=False
            if solo:
                print(el + str(type(el)))
    print("meta_df : " + str(len(meta_df["ID_document"])))
    print("meta_df : " + str(len(meta_df["ID_document"].drop_duplicates())))
    print("archive_df : " + str(len(archive_df["ID_document"])))

if __name__ == "__main__":
    link_data(CROBORA_WEB_FR)