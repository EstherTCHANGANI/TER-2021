import argparse
import json
import os

from pymongo import MongoClient

dir_path = os.path.dirname(os.path.realpath(__file__))

parser = argparse.ArgumentParser(description='Map collections to a unified event collection')
parser.add_argument('--mapping', type=str, default=os.path.join(dir_path, './mapping.json'), nargs="?",
                    help='The path of the mapping file')
parser.add_argument('--source', type=str, default=os.path.join(dir_path, './source.json'), nargs="?",
                    help='The path of the mapping file')

def get_source(sourceFile):
    with open(sourceFile) as f:
        return json.load(f)


def load_data_from_source(source: dict):
    collection = get_collection(source)
    return collection.find()


def get_collection(source):
    client = MongoClient(host=source["hostname"], port=int(source["port"]))
    db = client[source["database"]]
    collection = db[source["collection"]]
    return collection


def get_mapping(mappingFile:str, sourceName: str):
    with open(mappingFile) as f:
        return json.load(f)[sourceName]


def mapper(document: dict, mapping: dict, sourceName: str):
    new_doc = dict(source=sourceName, extra=document)
    for key in mapping:
        value = mapping[key]
        new_doc[value] = document[key]

    return new_doc


if __name__ == '__main__':
    args = parser.parse_args()

    sources = get_source(args.source)
    collection_event = get_collection(
        {"hostname": "localhost", "port": "27017", "database": "admin", "collection": "fiches_event"})

    collection_event.drop()

    for source in sources:
        data = load_data_from_source(source)
        res = []
        mapping = get_mapping(args.mapping, source["name"])
        for doc in data:
            res.append(mapper(doc, mapping, source["collection"]))
        collection_event.insert_many(res)
