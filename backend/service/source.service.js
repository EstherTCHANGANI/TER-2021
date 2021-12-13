import xlsx from "xlsx"
import mongoService from "./mongo.service";
import fs from "fs";

class SourceService {

    async importFromFile(name, file) {
        const workbook = xlsx.readFile(file.path);
        const sheet_name_list = workbook.SheetNames;

        return Promise.all(sheet_name_list.map(async sheetName => {

            const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
                // range: 1
            })
            // const headers = Object.keys(jsonData[0])

            // console.log(headers)

            // workbook.Sheets[workbook.SheetNames[0]]["!merges"].map(r => {
            //     const start = r.s.r, end = r.e.r;
            //     const col = r.s.c;
            //     const header = headers[col]
            //     console.log(header)
            //     console.log(start, end, jsonData.slice(start, end))
            //     const value = jsonData.slice(start, end).find(row => !!row[header])
            //     if (!!value) {
            //         console.log(value[header])
            //         jsonData.slice(start, end).forEach(row => row[header] = value[header])
            //         console.log("res = ")
            //         console.log(jsonData.slice(start, end))
            //     }


            // })

            if (!fs.existsSync("/tmp/sources")) {
                fs.mkdirSync("/tmp/sources")
            }
            fs.writeFileSync("/tmp/sources/" + name + "_" + sheetName + ".json", JSON.stringify(jsonData))
            return await mongoService.getCollection(name + "_" + sheetName).insertMany(jsonData)
        }))

    }

}

export default new SourceService()