# TER-2021

## Lancer le backend (Mongo + Serveur)

```bash
$ docker-compose up -d
``` 

## Poppuler la base de données
Sous linux : 
```bash
$ ./populate.sh
```

Sous Windows, il va falloir lancé les script à la main :

```bash
cd ./TER-base-donnée/Import
python3 Nettoyage.py
cd ../MergeData
python3 merge_donnee_metadonnee.py
python3 merge_metadonnee_RAI.py
cd ../Import
python3 LoadFile.py
cd ../mapper
python3 mapper.py 
```


## Todo
- Script de mapping
    - Split des champs personnalité
    - Split des champs illustration
