var mongoose = require('mongoose'); //mongo connection

	export default function postUser(req, err, model) {
			 return new Promise((resolve,reject) => {
			 	console.log('postUSEr!!!!!');
	 			var User = model.users;

	 			User.create({ name: 'priyanka', email: "p@f.com"}, function (err, createdUser) {
	 			    if(err) {
						throw err;
						reject();
					}
					resolve(createdUser); 
	 			})
			})
	}