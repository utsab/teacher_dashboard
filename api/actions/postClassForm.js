var mongoose = require('mongoose'); //mongo connection

	export default function postClassForm(req, err, model) {
 		var Student = model.students;
 		console.log('POSTFORM!!!!!');
 		console.log(req.session.user)
		const student = {
		    email: req.body.email,
		    github: req.body.github,
		    firstname: req.body.firstname,
	        lastname: req.body.lastname,
	        notes: req.body.notes
		};

		Student.create({ firstName: student.firstname, lastname: student.lastname, githubUsername: student.github, email: student.email, notes: student.notes }, function (err, createdUser) {
			    if(err) {
				throw err;
				reject();
			}
			console.log(createdUser)
		})
  		return Promise.resolve(student);
	}