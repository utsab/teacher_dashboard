var mongoose = require('mongoose'); //mongo connection
var http = require('http');
var validateGithubUsername = require('./validateGithub'); 

	export default function postClassForm(req, err, model) {
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
	 		

	 		validateGithubUsername(req.body.github, function(isValid) {
	 			if (isValid) {
	 				saveNewStudentToDB(); 
	 			} else {
	 				errors.push("Github username is invalid"); 
	 				console.log("Found " + errors.length + " form validation error(s)"); 
	 				reject(errors);
	 			}
	 		}); 


     function getDate() {
			    var today = new Date();
			    var dd = today.getDate();
			    var mm = today.getMonth()+1; //January is 0!
			    var yyyy = today.getFullYear();
			    if(dd < 10){
			    	dd ='0' + dd;
			    }
			    if(mm < 10){
			    	mm ='0' + mm;
			    }
			    today = mm + "-" + dd + "-" + yyyy;
			    return today;
			}

	 		function saveNewStudentToDB() {
	 			console.log("in saveNewStudentToDB........"); 

		 		var Student = model.students;
		 		var Teacher = model.teachers;

		 		const teacherEmail = req.session.user.email;


				const student = {
				    email: req.body.email,
				    github: "utsab",
				    firstname: req.body.firstname,
			        lastname: req.body.lastname,
			        notes: req.body.notes
				};


				Teacher.findOne({ 'email': teacherEmail }, function (err, person) {



					Student.create({ firstName: student.firstname, lastName: student.lastname, githubUsername: student.github, email: student.email, notes: student.notes, dateEnrolled: getDate(), teacher: person._id }, function (err, createdUser) {
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
	 		}	 		
	  	});
	}
