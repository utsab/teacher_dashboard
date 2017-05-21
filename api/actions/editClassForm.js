var mongoose = require('mongoose'); //mongo connection

	export default function editClassForm(req, err,model) {
		return new Promise((resolve,reject) => {
	 		var Student = model.students;
	 		var Teacher = model.teachers;

	 		const teacherEmail = req.session.user.email;
	 		const studentId = req.body.id;
	 		console.log(studentId);
			const student = {
			    email: req.body.email,
			    github: req.body.github,
			    firstname: req.body.firstname,
		        lastname: req.body.lastname,
		        notes: req.body.notes
			};

			Student.findOneAndUpdate({_id: studentId}, {$set:{ firstName: student.firstname, lastName:student.lastname, githubUsername:student.github, email:student.email, notes:student.notes}}, {new: true}, function(err, doc){
			    if(err){
			        console.log("Something wrong when updating data!");
			    }
			});

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
