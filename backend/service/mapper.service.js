import mongoService from "./mongo.service";

class MapperService {

    /**
     * 
     * @param {Object[]} sources 
     */
    mapFromSources(sources) {
        const events = mongoService.getCollection("fiches_event")
        source.map(source=> {
            console.log(source)
        })
    }


}

export default new MapperService();