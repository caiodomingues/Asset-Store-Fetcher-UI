# Asset Store Fetcher UI

That's a Simple UI made for [Asset Store Fetcher](https://github.com/MukaSchultze/asset-store-fetcher/) by [Samuel Schultze](https://github.com/MukaSchultze/).

### How to use

- Configure the Asset Store Fetcher (instructions are at his repo);
- Move the entire folder inside the UI folder, like:

```.
Asset-Store-Fetcher-UI
|
├── app
├── asset-store-fetcher
├── app.js
├── ...
```

- Do ```npm run app```, this will start UI and the Fetcher;
- To start only the UI: ```npm run ui```;
- To update fetcher data: ```npm run update```;
- If you want to use the nodemon with this options, just add ```run npm watch:[]```, works with app, ui, update;