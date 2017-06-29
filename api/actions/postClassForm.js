var mongoose = require('mongoose'); //mongo connection
var http = require('http');

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
	 		

	 		var options = {
	 		  host: 'fcc-profile-scraper.herokuapp.com',
	 		  port: 80,
	 		  path: '/user/' + req.body.github
	 		};



	 		http.get(options, function(resp){
	 		  resp.setEncoding('utf8');

	 		  console.log("response status code: " + resp.statusCode);


	 		  resp.on('data', function(chunk){
	 		    //do something with chunk?  Maybe we can remove this 'data' handler
	 		    console.log("received data!");
	 		  });

	 		  resp.on('end', function() {
	 		  	console.log("resp ended!!!!!!"); 
	 		  	console.log("status code in resp: " + this.statusCode); 

	 		  	if (this.statusCode === 404) {
	 		  		 errors.push("Github username is invalid"); 
	 		  		 console.log("Found " + errors.length + " form validation error(s)"); 
	 		  		 reject(errors);
	 		  	} else {
	 		  		// Assume request succeeded
	 		  		console.log("Github is valid!...."); 
	 		  		saveNewStudentToDB(req); 
	 		  	}
	 		  });


	 		}).on("error", function(e){
	 		  console.log("Got error:^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ " + e.message);
	 		});



	 		function saveNewStudentToDB(req) {
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

	 		}
	 		
	  	});
	}
