import mongoService from "./mongo.service";
import NotFoundException from "../error/NotFound.error"

class ConfigService {

    async listAll() {
        const collection = mongoService.getCollection("config");
        return await collection.find().toArray();
    }

    get(configName) {
        const collection = mongoService.getCollection("config");
        return new Promise((resolve, reject) => {
            collection.findOne({ name: configName }, (err, res) => {
                if(err) {
                    return reject(err);
                }
                resolve(res?.config || null);
            })
        })
    }

    async addOrUpdate(configName, config) {
        const collection = mongoService.getCollection("config");
        await collection.updateOne({name:configName}, {$set: {name: configName, config}}, {upsert:true})
        return config
    }


}

export default new ConfigService();