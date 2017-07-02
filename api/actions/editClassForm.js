var mongoose = require('mongoose'); //mongo connection


///Users/utsabsaha/Documents/learning/fcc-stack/teacher_dashboard


	export default function editClassForm(req, err,model) {
		return new Promise((resolve,reject) => {

			var errors = []; 

			if (!req.body.email) {
	 			errors.push("Please enter a valid email"); 
	 		}
	 		if (!req.body.github) {
	 			errors.push("Please enter a valid github username"); 
	 		}
	 		if (!req.body.firstname) {
	 			errors.push("Please enter a valid firstname"); 
	 		}
	 		if (!req.body.lastname) {
	 			errors.push("Please enter a valid lastname"); 
	 		}


	 		if ( errors.length > 0 ) {
	 			console.log("Found " + errors.length + " form validation error(s)"); 
	 			throw errors;
	 			reject();
	 		}
			 		
			 		
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
