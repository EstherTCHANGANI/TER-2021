import { MongoClient } from "mongodb";

// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
const uri = "mongodb://localhost:27017?retryWrites=true&writeConcern=majority";
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

}

export default new MongoService()
