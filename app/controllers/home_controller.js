module.exports.renderHome = (app, req, res) => {

    // Asset Store Fetcher needs to be inside Root Folder:
    const dataPath = './asset-store-fetcher/data/as';
    const homeDAO = new app.models.home_model(dataPath);

    homeDAO.listDirectory((error, result) => {
        if (error)
            throw error;

        return result ?
            homeDAO.readJSON(result[0], (error, result) => {
                return result ? res.render('home_view',
                    { json: JSON.parse(result) })
                    : res.send(error);
            }) : res.send(error);
    });
}