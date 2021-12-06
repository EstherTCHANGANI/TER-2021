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

Le fichier `mapping.json` définit comment les champs des différentes sources de données vont être mappés dans la collection `fiches_event`.

```json
{
    "ina": {
        "id": "ID_notice", # Champs dans fiches_event => champ de la source
        "titre": "Titre_propre",
        "date_de_diffusion": {
            "fields": ["Date_de_diffusion", "Heure_de_diffusion"], 
          # Liste des champs qui seront passés en argument à la méthode suivante
            "function": "lambda args : str(args[0]) + \" \" + str(args[1]) if len(args) > 1 else args[0]" 
          # Fonction qui permet d'évaluer les champs précédents  
        }
    }
 }
```

Si le champ est une `string`, alors le champ correspondant dans le document initial est utilisé.

Si le champ est un `objet`, alors :

 - les `fields` sont récupérer dans le document initial
 - la `function` est évaluée avec comme argument la liste des `fields` 
 
Dans l'exemple ci-dessus, le champ `date_de_diffusion` vaudra `04/12/2005 13:02:40`, lorsque `Date_de_diffusion=04/12/2005` et `Heure_de_diffusion=13:02:40`. 



## Installation

```bash
$ pip install -r requirements.txt
```


## Execution

Obtenir de l'aide : 

```bash
$ python3 mapper.py -h
```

Lancer le script :
```bash
$ python3 mapper.py
```
