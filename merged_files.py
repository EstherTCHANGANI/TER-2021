import glob
import re

# Looking for filenames like 'fiche_inna.csv' ...
file_parts = [name for name in glob.glob('*.csv') ]
with open("fiche_merged.csv","wb") as fiche_merged:
    for (i, name) in enumerate(file_parts):
        with open(name, "rb") as file_part:
            if i != 0:
                next(file_part) # skip headers if not first file
            fiche_merged.write(file_part.read())

