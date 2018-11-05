const fs = require('fs');

class HomeDAO {
    constructor(dataPath) {
        this._dataPath = dataPath;
    }

    listDirectory(callback) {
        fs.readdir(this._dataPath, (error, result) => {
            return result ? callback(null, result) : callback(error, null);
        });
    }

    readJSON(file, callback) {
        fs.readFile(`${this._dataPath}/${file}`, 'utf-8', (error, result) => {
            return result ? callback(null, result) : callback(error, null);
        });
    }
}

module.exports = () => {
    return HomeDAO;
}