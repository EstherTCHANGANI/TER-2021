import { values } from "lodash";
import { MongoClient } from "mongodb";
import _ from "lodash";

const DB_HOST_NAME = process.env.DB_HOST_NAME || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";

const uri = `mongodb://${DB_HOST_NAME}:${DB_PORT}?retryWrites=true&writeConcern=majority`;
const DB_NAME = "admin"

class MongoService {

    constructor() {
        this._loadDatabase();
    }

    async _loadDatabase() {
        this.client = new MongoClient(uri);
        await this.client.connect()
        this.database = this.getDatabase(DB_NAME);
    }

    getDatabase(dbName) {
        return this.client.db(dbName);
    }

    getCollection(collecitonName) {
        return this.database.collection(collecitonName);
    }

    async findManyByKeyWord(keyword){
        const re = new RegExp(".*" + keyword + ".*")
        const res = await this.getCollection("crobora_doc").find({
            "document_title":re
        }).toArray()
        console.log(uri);
        console.log(DB_HOST_NAME);
        console.log(DB_PORT);
        console.log("============");
        const final_res = Object.values(_.groupBy(res, "ID_document"));
        console.log(final_res) 
        return final_res;
    }



}

export default new MongoService()
