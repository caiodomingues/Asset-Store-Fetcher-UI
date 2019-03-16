module.exports.renderHome = (app, req, res) => {

	// Asset Store Fetcher needs to be inside Root Folder:
	const tokenPath = './asset-store-fetcher/data/';
	const dataPath = './asset-store-fetcher/data/as';
	const fs = new app.utils.fs(tokenPath, dataPath);

	fs.listDirectory((error, result) => {
		if (error)
			throw error;

		return result ?
			fs.readFile(`${dataPath}/${result[result.length - 1]}`, (error, result) => {

				var parsed = JSON.parse(result);

				var data = Object.assign(
					parsed.value[0],
					parsed.value[1],
					parsed.value[2],
					parsed.value[3],
					parsed.value[4]
				);

				var json = {
					name: data.name,
					bio: data.bio,
					langCode: data.language_code,
					currency: data.currency,
					publisherID: data.publisher_id,
					address: data.address,
					balance: data.balance,
					overview: data.overview,
					bigData: {
						allPackages: data.packages,
						publishedPackages: [],
						draftPackages: [],
						deprecatedPackages: [],
						declinedPackages: [],
						periods: data.periods
					}
				};

				json.bigData.allPackages.forEach(pkg => {
					pkg.versions.forEach(version => {
						if (version.status == 'published')
							json.bigData.publishedPackages.push(pkg.versions[0]);
						else if (version.status == 'draft')
							json.bigData.draftPackages.push(pkg.versions[0]);
						else if (version.status == 'deprecated')
							json.bigData.deprecatedPackages.push(pkg.versions[0]);
						else if (version.status == 'declined')
							json.bigData.declinedPackages.push(pkg.versions[0]);
					});
				});

				fs.writeFile(JSON.stringify(json), (error) => {
					if (error) throw 'Error:' + error;
				});

				return result ? res.render('homeView', { json }) : res.send(error);
			}) : res.send(error);
	});
};