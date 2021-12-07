import childProcess from "child_process"

class MapperService {

    constructor() {
        this.maperPath  = process.env.MAPPER_PATH || "/mapper/mapper.py";
        this.pythonExecutor  = process.env.PYTHON_EXECUTOR || "python3";
    }

    /**
     * 
     * @param {Object[]} sourceNames 
     */
    async mapFromSources(sourceNames) {
        await Promise.all(sourceNames.map(sourceName =>
            new Promise((resolve, reject) => childProcess.exec(`python3 ${this.maperPath} ${sourceName}`,
                (err) => {
                    if (!!err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
            ))
        )
    }


}

export default new MapperService();