var mongoose = require('mongoose'); //mongo connection

	export default function loadInfo(req,err,model) {
	 	return new Promise((resolve,reject) => {
	 		var People = model.people;
			People.findOne({ name: 'Sarah' },function(err,results) {
				if(err) {
					throw err;
					reject();
				}
				resolve({
			    	message: 'This came from the api server',
			    	time: results.name
		  		})

			})
		})
	}

