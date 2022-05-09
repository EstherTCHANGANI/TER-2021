from numpy import float64
from CONSTANTES_archivesLoad import *
import pandas as pd

def link_data(file_name_fiche):
    #On concatene les données entre eux avant de passer au merge des metadonnées
    archive_df = pd.read_csv(file_name_fiche)
    meta_df = pd.read_csv(MData_INA)

    columns_transfer=["ID_document","day_place_consult"] #always have to place ID_doc as it is what allows the merge to work

    columns_transfer_toMeta=["ID_document","channel"]
    
    archive_df["ID_document"] = archive_df["ID_document"].astype("string")
    meta_df["ID_document"] = meta_df["ID_document"].astype("int64").astype("string")

    result = complete_data(archive_df, meta_df,columns_transfer)
    result_meta = complete_data(meta_df,archive_df,columns_transfer_toMeta)
    result_meta["language"]="French"
    link_images(meta_df,result)

    #count(meta_df,archive_df,0,result)
    print("files formated : " + str(len(result["ID_document"])))
    result = result.to_csv(final_INA_file, index=False)
    result_meta=result_meta.to_csv(final_INA_CROBORA_file, index=False)

def link_images(images_df,final_df):
    final_df["images"]=""
    final_df.reset_index()
    for index,row in final_df.iterrows():
        list_images = images_df[images_df["ID_document"]==row["ID_document"]]
        for indexM,rowM in list_images.iterrows():
            final_df.at[index,"images"]+= rowM["image_title"]+", "
        final_df.at[index,"images"]=final_df.at[index,"images"][:-2]



def complete_data(df_to_complete,df_to_read,columns):
    return(df_to_complete.merge(df_to_read.get(columns), on="ID_document", how="left").drop_duplicates())

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
    link_data(file_INA)