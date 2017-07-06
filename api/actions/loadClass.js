var mongoose = require('mongoose'); //mongo connection

	export default function loadClass(req,err,model) {
	 return new Promise((resolve,reject) => {
	 	var Student = model.students;
	 	var Teacher = model.teachers;
	 	const teacherEmail = req.session.user.email;

	 	Teacher.findOne({ 'email': teacherEmail }, function (err, person) {
				Student
				.find({ teacher : person._id })
				.exec(function (err, students) {
				  if (err) return handleError(err);
				  const allStudentsList = students;
				  resolve(allStudentsList);
				});
			});
		});
	}
