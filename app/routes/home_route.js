module.exports = (app) => {
    app.get('/', (req, res) => {
        app.controllers.home_controller.renderHome(app, req, res);
    });
}