# Import script

## Exceution

Obtenir de l'aide : 

installer pandas , openpyxl, pymongo .. au cas ou vous n' avez pas les packages.

il faut que vous ajouter le path de dossier des données originaux dans tous les commandes.

On ajoute aussi -h ou cas ou on a un dossier specifique ou on veux stocker nos csv.
```bash
$ python3 LoadFile.py C:/Users/ibrah/Documents/TER/original_fils
```

Lancer le script :

```bash
$ python3 LoadFile.py
```

Pour configuer le script avec la base mongodb il suffit d'ajouter les parametres dans la commande

Exemple :

python3 LoadFiles.py  C:/Users/ibrah/Documents/TER/original_fils --mongoUrl mongodb://localhost:27017/ --mongoDatabase admin
