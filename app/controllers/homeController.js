module.exports.renderHome = (app, req, res) => {

    // Asset Store Fetcher needs to be inside Root Folder:
    const tokenPath = './asset-store-fetcher/data/';
    const dataPath = './asset-store-fetcher/data/as';
    const homeDAO = new app.models.homeDAO(tokenPath, dataPath);

    homeDAO.listDirectory((error, result) => {
        if (error)
            throw error;

        const lastData = result.length - 1;
        return result ?
            homeDAO.readFile(`${dataPath}/${result[lastData]}`, (error, result) => {

                var parsedData = JSON.parse(result);

                /* 
                    Every JSON structure generated from API is made with
                    5 Objects in an array, so, to sort data, i just turn it all a unique
                    object and grab what i need inside a new Object:
                */

                var item0 = parsedData.value[0];
                var item1 = parsedData.value[1];
                var item2 = parsedData.value[2];
                var item3 = parsedData.value[3];
                var item4 = parsedData.value[4];

                var allData = Object.assign(item0, item1, item2, item3, item4);

                var json = {
                    name: allData.name,
                    bio: allData.bio,
                    langCode: allData.language_code,
                    currency: allData.currency,
                    publisherID: allData.publisher_id,
                    address: allData.address,
                    balance: allData.balance,
                    overview: allData.overview,
                    largeData: {
                        allPackages: allData.packages,
                        publishedPackages: [],
                        draftPackages: [],
                        deprecatedPackages: [],
                        declinedPackages: [],
                        periods: allData.periods
                    }
                }

                // Now i have to grab those packages and make arrays for each type of version status

                json.largeData.allPackages.forEach(pkg => {
                    pkg.versions.forEach(version => {
                        if (version.status == 'published')
                            json.largeData.publishedPackages.push(pkg.versions[0]);
                        else if (version.status == 'draft')
                            json.largeData.draftPackages.push(pkg.versions[0]);
                        else if (version.status == 'deprecated')
                            json.largeData.deprecatedPackages.push(pkg.versions[0]);
                        else if (version.status == 'declined')
                            json.largeData.declinedPackages.push(pkg.versions[0]);
                    });
                });

                return result ? res.render('homeView', { json }) : res.send(error);
            }) : res.send(error);
    });
}