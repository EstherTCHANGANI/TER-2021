import { MongoClient } from "mongodb";

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
        const res = await this.getCollection("fiches_event").find({
            "titre":re
        }).toArray() 
        console.log(res)
        return res
    }

}

export default new MongoService()
