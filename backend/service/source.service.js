import xlsx from "xlsx"
import mongoService from "./mongo.service";

class SourceService {

    async importFromFile(name, file){
        const workbook = xlsx.readFile(file.path);
        const sheet_name_list = workbook.SheetNames;
        const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        return await mongoService.getCollection(name).insertMany(sheet)
    }

}

export default new SourceService()