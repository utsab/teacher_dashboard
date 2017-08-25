var mongoose = require('mongoose'); //mongo connection
var passwordHash = require('password-hash');

export default function login(req, err, model) {
	const Teacher = model.teachers;
	const user = {
	    email: req.body.email,
	    password: req.body.password
	};

 	return new Promise((resolve,reject) => {
	 	Teacher.findOne({ 'email': user.email }, function (err, person) {
			if (err) {
				reject(new Error('error: person===null'));
			}
			else if(person == null) {
				reject(new Error('error: user not found'));
			}
			else {
				if((passwordHash.verify(user.password, person.password))) { // true
					user.name = person.name;
					user.username = person.username;
					req.session.user = user;
				  	resolve(user);
				}
				else {
					reject(new Error('error: email and password do not match'));
				}

			 }
		});
	});
};
