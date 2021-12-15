#!/bin/bash

cd ./TER-base-donnée/Import

echo "Execution de Nettoyage.py ..."
python3 Nettoyage.py
echo "Execution terminée"

cd ../MergeData

echo "Execution de merge_donnee_metadonnee.py ..."
python3 merge_donnee_metadonnee.py
echo "Execution terminée"

echo "Execution de merge_donnee_metadonnee.py ..."
python3 merge_metadonnee_RAI.py
echo "Execution terminée"


cd ../Import

echo "Execution de LoadFile.py ..."
python3 LoadFile.py
echo "Execution terminée"

cd ../mapper

echo "Execution de mapper.py ..."
python3 mapper.py
echo "Execution terminée"

cd ../..

echo "Remplissage de la base de donnée terminée"