const fs = require('fs');

class HomeDAO {
    constructor(tokenPath, dataPath) {
        this._tokenPath = tokenPath;
        this._dataPath = dataPath;
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
}

module.exports = () => {
    return HomeDAO;
}