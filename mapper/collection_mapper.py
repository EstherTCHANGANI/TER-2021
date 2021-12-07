import argparse
import os
from pymongo import MongoClient

dir_path = os.path.dirname(os.path.realpath(__file__))

parser = argparse.ArgumentParser(description='Map collections to a unified event collection')
parser.add_argument('collection', type=str, default=None,
                    help='The name of the collection to map')


def get_source(mongo_config, collection_name):
    config_collection = get_collection(mongo_config, "config")
    configs = config_collection.find_one({"name": "sources"})
    if configs is None: 
        return None
    for conf in configs["config"] :
        if conf["collection"] == collection_name :
            return conf
    return None


def get_collection(source:dict, collection_name:str):
    client = MongoClient(host=source["hostname"], port=int(source["port"]))
    db = client[source["database"]]
    collection = db[collection_name]
    return collection


def get_mapping(source_name: str):
    config_collection = get_collection(mongo_config, "config")
    configs = config_collection.find_one({"name": "mapping"})
    if configs is None: 
        return None
    return configs["config"][source_name]


def mapper(document: dict, mapping: dict, source_name: str):
    new_doc = dict(source=source_name, extra=document)
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


def _get_fields(document, value):
    fields = list()
    for field_name in value["fields"]:
        if field_name in document:
            field = document[field_name]
            fields.append(field)
    return fields


def load_data_from_source(source: dict,collection_name:str):
    collection = get_collection(source, collection_name)
    return collection.find()



if __name__ == '__main__':
    args = parser.parse_args()

    mongo_config = {
        "hostname": os.environ["DB_HOST_NAME"] if "DB_HOST_NAME" in os.environ else "localhost", 
        "port": os.environ["DB_PORT"] if "DB_PORT" in os.environ else "27017", 
        "database": "admin"}

    source = get_source(mongo_config, args.collection)

    if source is None:
        print("Source configuration for collection " + args.collection + " is not defined")
        exit(1)

    mapping = get_mapping(source["name"])

    if mapping is None:
        print("Mapping configuration for collection " + args.collection + " is not defined")
        exit(1)

    collection_event = get_collection(mongo_config, "fiches_event")

    data = load_data_from_source(mongo_config, source["collection"])
    res = []
    print("Mapping collection: " + source["collection"])
    for doc in data:
        res.append(mapper(doc, mapping, source["collection"]))
    print(str(len(res)) + " documents mapped.")
    collection_event.insert_many(res)
