const fs = require('fs');

class FS {
    constructor(tokenPath, dataPath) {
        this._tokenPath = tokenPath;
        this._dataPath = dataPath;
        this._date = new Date();
    }

    listDirectory(callback) {
        fs.readdir(this._dataPath, (error, result) => {
            return result ? callback(null, result) : callback(error, null);
        });
    }

    readFile(file, callback) {
        fs.readFile(file, 'utf-8', (error, result) => {
            return result ? callback(null, result) : callback(error, null);
        });
    }

    writeFile(data, callback) {
        fs.writeFile(`user/${this._date.getUTCFullYear()}-${this._date.getUTCMonth()}-${this._date.getUTCDate()}.json`,
            data, 'utf-8', (error, result) => {
                return result ? callback(null, result) : callback(error, null);
            });
    }
}

module.exports = () => {
    return FS;
}