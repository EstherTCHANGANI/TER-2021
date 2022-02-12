# TER-2021

## Prérequis

- Avoir node, docker et python installés.
- Installer les modules python suivants : pymongo, pandas, openpyxl

## Lancer le backend (Mongo + Serveur)

```bash
$ docker-compose up -d
``` 

## Poppuler la base de données
Sous linux : 
```bash
$ ./populate.sh
```

Sous Windows, il va falloir lancé les script à la main : (ou utiliser git bash pour lancer la commande ./populate.sh)

```bash
cd ./TER-base-donnée/Import
python3 Nettoyage.py
cd ../MergeData
python3 merge_donnee_metadonnee.py
python3 merge_metadonnee_RAI.py
cd ../Import
python3 LoadFile.py
cd ../mapperCancel changes
python3 mapper.py 
```

## Lancer le frontend (Angular)

```bash
cd ./Front-end/CROBORA-App/
npm i
ng serve -o
```
