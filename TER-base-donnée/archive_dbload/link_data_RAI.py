from CONSTANTES_archivesLoad import *
import pandas as pd

def concat_data(file_name_fiche, file_name_meta):
    #On concatene les données entre eux avant de passer au merge des metadonnées
    frames = [pd.read_csv(file_name_fiche), pd.read_csv(file_name_meta)]
    concated = pd.concat(frames, ignore_index=True)

    RAI_meta_df = pd.read_csv(MData_RAI)
    columns_transfer=["ID_document", "time_start","time_stop","day_place_consult"]
    columns_transfer_toCROBO = ["ID_document","channel"]

    result = complete_data(concated, RAI_meta_df,columns_transfer)
    link_images(RAI_meta_df,result)
    result_CROBO=complete_data(RAI_meta_df,concated,columns_transfer_toCROBO)
    result_CROBO["language"]="Italian"
    #count(RAI_meta_df,concated,1,result)
    print("files formated : " + str(len(result["ID_document"])))
    result = result.to_csv(final_rai_file, index=False)
    result_CROBO=result_CROBO.to_csv(final_rai_CROBORA_file, index=False)

def complete_data(df_to_complete,df_to_read,columns):
    return(df_to_complete.merge(df_to_read.get(columns), on="ID_document", how="left").drop_duplicates())

def link_images(images_df,final_df):
    final_df["images"]=""
    final_df.reset_index()
    for index,row in final_df.iterrows():
        list_images = images_df[images_df["ID_document"]==row["ID_document"]]
        for indexM,rowM in list_images.iterrows():
            final_df.at[index,"images"]+= rowM["image_title"]+", "
        final_df.at[index,"images"]=final_df.at[index,"images"][:-2]


##to know the number of files in CROBORA data and "official" data, either each or in common
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
    concat_data(file_RAI_20, file_RAI_13)