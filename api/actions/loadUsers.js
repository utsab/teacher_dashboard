var mongoose = require('mongoose'); //mongo connection

	export default function loadUsers(req,err,model) {
	 return new Promise((resolve,reject) => {
	 			var User = model.users;
	 			console.log(User);
				var usersList = [];
	 			User.find({}, function(err, users) {
					if(err) {
						throw err;
						reject();
					}

	 				users.forEach(function(user) {
	 					usersList.push(user);
	 				})
					resolve(usersList)
	 			})
			})
	}