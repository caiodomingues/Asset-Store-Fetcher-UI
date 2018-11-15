module.exports = (app) => {
    app.get('/', (req, res) => {
        app.controllers.homeController.renderHome(app, req, res);
    });
}