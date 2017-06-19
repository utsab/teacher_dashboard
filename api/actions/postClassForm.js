var mongoose = require('mongoose'); //mongo connection

	export default function postClassForm(req, err, model) {
		return new Promise((resolve,reject) => {
	 		var Student = model.students;
	 		var Teacher = model.teachers;

	 		const teacherEmail = req.session.user.email;
			const student = {
			    email: req.body.email,
			    github: req.body.github,
			    firstname: req.body.firstname,
		        lastname: req.body.lastname,
		        notes: req.body.notes
			};


			Teacher.findOne({ 'email': teacherEmail }, function (err, person) {
				Student.create({ firstName: student.firstname, lastName: student.lastname, githubUsername: student.github, email: student.email, notes: student.notes, teacher: person._id }, function (err, createdUser) {
					    if(err) {
							throw err;
							reject();
						}
						else {
							Student
							.findOne({ 'email': student.email })
							.populate('teacher') //This populates the author id with actual author information!
							.exec(function (err, student) {
							  if (err) return handleError(err);
							});

							Student
							.find({ teacher : person._id })
							.exec(function (err, students) {
							  if (err) return handleError(err);
							  const allStudentsList = students;
							  resolve(allStudentsList); 
							});
						}
					});
				});
	  	});
	}
