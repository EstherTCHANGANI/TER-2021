import json

from pymongo import MongoClient


def get_source():
    with open('./source.json') as f:
        return json.load(f)


def load_data_from_source(source: dict):
    collection = get_collection(source)
    return collection.find()


def get_collection(source):
    client = MongoClient(host=source["hostname"], port=int(source["port"]))
    db = client[source["database"]]
    collection = db[source["collection"]]
    return collection


def get_mapping(sourceName: str):
    with open('./mapping.json') as f:
        return json.load(f)[sourceName]


def mapper(document: dict, mapping: dict, sourceName: str):
    new_doc = dict(source=sourceName, extra=document)
    for key in mapping:
        value = mapping[key]
        new_doc[value] = document[key]

    return new_doc


if __name__ == '__main__':
    sources = get_source()
    collection_event = get_collection(
        {"hostname": "localhost", "port": "27017", "database": "admin", "collection": "fiches_event"})

    collection_event.drop()

    for source in sources:
        data = load_data_from_source(source)
        res = []
        mapping = get_mapping(source["name"])
        for doc in data:
            res.append(mapper(doc, mapping, source["collection"]))
        collection_event.insert_many(res)
