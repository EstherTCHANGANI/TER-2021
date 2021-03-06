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
    """
    Read the source file
    :param sourceFile: path of the file
    :return: dictionary
    """
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


def get_mapping(mappingFile: str, sourceName: str):
    with open(mappingFile) as f:
        return json.load(f)[sourceName]


def mapper(document: dict, mapping: dict, sourceName: str):
    new_doc = dict(source=sourceName, extra=document)
    for key in mapping:
        value = mapping[key]
        if type(value) == str:
            if value in document:
                new_doc[key] = document[value]
            else:
                new_doc[key] = None
        else:
            func = eval(value["function"])
            fields = _get_fields(document, value)
            try:
                new_doc[key] = func(fields)
            except:
                new_doc[key] = None
    return new_doc


def _get_fields(document:dict, value):
    fields = list()
    for field_name in value["fields"]:
        if field_name in document:
            field = document[field_name]
            fields.append(field)
    return fields


if __name__ == '__main__':
    args = parser.parse_args()

    sources = get_source(args.source)
    collection_event = get_collection(
        {"hostname": "localhost", "port": "27017", "database": "TER", "collection": "fiches_event"})

    collection_event.drop()

    for source in sources:
        data = load_data_from_source(source)
        res = []
        print("Mapping collection: " + source["collection"])
        mapping = get_mapping(args.mapping, source["name"])
        for doc in data:
            res.append(mapper(doc, mapping, source["collection"]))
        print(str(len(res)) + " documents mapped.")
        collection_event.insert_many(res)
