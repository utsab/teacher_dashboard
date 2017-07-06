var mongoose = require('mongoose'); //mongo connection
var passwordHash = require('password-hash');

export default function signup(req, err, model) {
	var hashedPassword = passwordHash.generate(req.body.password);

	const Teacher = model.teachers;
	const user = {
	    name: req.body.name,
	    username: req.body.username,
	    email: req.body.email,
	    password: hashedPassword
	};

	Teacher.create({ name:user.name, username:user.username, email:user.email, password: hashedPassword}, function (err, createdUser) {
	    if(err) {
			throw err;
		}
	});
	req.session.user = user;
  	return Promise.resolve(user);
}
