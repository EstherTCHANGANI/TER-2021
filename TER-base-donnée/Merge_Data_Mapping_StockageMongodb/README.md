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
        "database": "base_ter", # Nom de la base donnée,
        "collection": "Fiches_INA_merged", # Nom de la collection dens la base de données
        "name":"ina" # Nom donné dans la configuration du mapping
    }
]
```

### mapping.json

Le fichier `mapping.json` défint comment les champs des différentes sources de données vont être mappés dans la collection `fiches_event`.

```json
<<<<<<< HEAD:TER-base-donnée/Merge_Data_Mapping_StockageMongodb/README.md
"ina": {
    "id": "ID_notice",
    "titre": "Titre",
    "date de diffusion": {
      "fields": [
        "Date_de_diffusion",
        "Heure_de_diffusion"
      ],
      "function": "lambda args : str(args[0]) + \" \" + str(args[1]) if len(args) > 1 else args[0]"
    },
    "Illustration": {
      "fields": [
        "Illustration"
      ],
      "function": "lambda args: list(map(str.strip,args[0].split(\",\")))"
    },
    "Image": "Image",
    "Canal de transmission": "Chaine",
    "Duree": "Duree",
    "Lieu": {
      "fields": [
        "Lieu"
      ],
      "function": "lambda args: list(map(str.strip,args[0].split(\",\")))"
    },
    "Evenement": {
      "fields": [
        "Evenement"
      ],
      "function": "lambda args: list(map(str.strip,args[0].split(\",\")))"
    },
    "Producteurs": {
      "fields": [
        "Producteurs"
      ],
      "function": "lambda args: list(map(str.strip,args[0].split(\",\")))"
    },
    "Personnalite": {
      "fields": [
        "Personnalite"
      ],
      "function": "lambda args: list(map(str.strip,args[0].split(\",\")))"
    },
    "Date_de_consultation": "Date_de_consultation",
    "Lieu_de_consultation": "Lieu_de_consultation"
  },

=======
{
<<<<<<< HEAD
   "ina": {
        "id": "ID Notice",
        "titre": "Titre_propre",
        "date de diffusion": {
            "fields": [
                "Date_de_diffusion",
                "Heure_de_diffusion"
            ],
            "function": "lambda args : str(args[0]) + \" \" + str(args[1]) if len(args) > 1 else args[0]"
        },
        "canal de transmission": "France 2",
        "duree": "Duree",
        "Date_de_diffusion_meta": "Date_de_diffusion_meta",
        "Image": "Image",
        "Personnalite": "Personnalité",
        "Evenement"	: "Evenement",
        "Lieu"	: "Lieu",
        "Illustration":	"Illustration",
        "Date et lieu de consultation" : "Date_et_lieu_de_consultation"
=======
    "ina": {
        "id": "ID_notice", # Champs dans fiches_event => champ de la source
        "titre": "Titre_propre",
        "date_de_diffusion": {
            "fields": ["Date_de_diffusion", "Heure_de_diffusion"], 
          # Liste des champs qui seront passés en argument à la méthode suivante
            "function": "lambda args : str(args[0]) + \" \" + str(args[1]) if len(args) > 1 else args[0]" 
          # Fonction qui permet d'évaluer les champs précédents  
        }
>>>>>>> origin/develop
    }
 }
>>>>>>> a334fb772fa627016975a6b92ca89cc38f3c6b66:TER-base-donnée/MergeData/README.md
```

Si le champ est une `string`, alors le champ correspondant dans le document initial est utilisé.

Si le champ est un `objet`, alors :

 - les `fields` sont récupérer dans le document initial
 - la `function` est évaluée avec comme argument la liste des `fields` 
 
Dans l'exemple ci-dessus, le champ `date_de_diffusion` vaudra `04/12/2005 13:02:40`, lorsque `Date_de_diffusion=04/12/2005` et `Heure_de_diffusion=13:02:40`. 


## Exceution

Obtenir de l'aide : 

```bash
$ python3 mapper.py -h
```

Lancer le script :
```bash
$ python3 mapper.py
```
# Merge des données 
Pour realiser le merge des données avec leur metadonnées il suffit de lancer le script en utilisant 
la commande python3 merge_donnee_metadonnee.py

### Remarque :
1. La configuration des chemins et parametres de ces etapes se realisent au niveau de fichier constantes.py
2. Le script generalisée de merge est merge_donnee_metadonnee.py
3. Le fichier merge_metadonnee_RAI.py est un cas special de merge ou on peux avoir plusieurs source des données
