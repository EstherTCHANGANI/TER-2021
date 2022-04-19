import mongoService from "./mongo.service";
import _ from "lodash";

class SubjectService {

    /**
     * 
     * @param {string} ID_wanted
     * @returns 
     */
    async getSubject(ID_wanted) {
        var query = { ID_document: ID_wanted };
        var doc = await mongoService
            .getCollection("sujets_doc")
            .findOne(query)
        console.log("subject got " + doc);
        return doc
    }
}


export default new SubjectService();