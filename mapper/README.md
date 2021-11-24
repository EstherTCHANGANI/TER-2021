# Mapper script

## Configuration

### source.json

Le fichier `source.json` contient l'ensemble des source des donées qui vont être utilisées dans la création de la colleciton `fichers_event`.

Ce fichier se présent comme ceci :
```json
[
    {
        "hostname": "localhost", # Hostname du serveur MOngoDB
        "port": "27017", # Port du serveur MongoDB
        "database": "admin", # Nom de la base donnée,
        "collection": "fiches_INA", # Nom de la collection dens la base de données
        "name":"ina" # Nom donné dans la configuration du mapping
    }
]
```

### mapping.json

Le fichier `mapping.json` défint comment les champs des différentes sources de données vont être mappés dans la collection `fiches_event`.

```json
{
    "ina": {
        "ID_notice": "id", # Champ de la source => champs dans fiches_event
        "Titre_propre": "titre"
    }
 }
```

## Exceution

Obtenir de l'aide : 

```bash
$ python3 mapper.py -h
```

Lancer le script :
```bash
$ python3 mapper.py
```