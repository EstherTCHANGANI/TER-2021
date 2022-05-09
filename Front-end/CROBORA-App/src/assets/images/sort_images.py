import os
import unicodedata
from PIL import Image

dirname = os.path.dirname(__file__)
image_directory= dirname+'/images_archives'

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD',s) if unicodedata.category(c) != 'Mn')

def rename_all_images():
    for subdir, dirs, files in os.walk(image_directory):
        for file in files:        
            if subdir[-3:]=='TF1'and file[-3:]!="png":
                new_name = os.path.join(subdir,strip_accents(file))[:-3]+"png"
                image = Image.open(os.path.join(subdir,file))
                image.save(new_name)
                print("added : " + new_name)
                os.remove(os.path.join(subdir,file))
                print("removing : " + os.path.join(subdir,file))
            else:
                os.rename(os.path.join(subdir,file),os.path.join(subdir,strip_accents(file)))
            if subdir[-4:]=='Arte'and file[-3:]=="png":
                print("removing : " + os.path.join(subdir,file))
                os.remove(os.path.join(subdir,file))

if __name__ == "__main__":
    rename_all_images()