var mongoose = require('mongoose'); //mongo connection
var request = require('request');

	export default function loadDashboard(req,err,model) {
	 return new Promise((resolve,reject) => {
	 	const Student = model.students;
	 	const Teacher = model.teachers;
	 	const teacherEmail = req.session.user.email;
	 	const fccBaseUrl = 'https://fcc-profile-scraper.herokuapp.com/user/';

	 	Teacher.findOne({ 'email': teacherEmail }, function (err, person) {
				Student
				.find({ teacher : person._id })
				.exec(function (err, students) {
				  if (err) return handleError(err);
				  const allStudentsList = students;
				  allStudentsList.forEach(function(student) {
				  	const githubName = student.githubUsername;
				  	var body;
				    request(fccBaseUrl + githubName, function (error, response, body){
				      if (error) {
				        throw error;
				        reject();
				      }
				      body = JSON.parse(body);

				    var dates = [];

				    body.completedChallenges.map(function(challenge) {
				    	if(challenge.completed_at !== 'Completed'){
				    		dates.push(new Date(convertDate(challenge.completed_at)))
				    	}
				    });

				    function convertDate(inputFormat) {
					  function pad(s) { return (s < 10) ? '0' + s : s; }
					  var d = new Date(inputFormat);
					  return [pad(d.getFullYear()), pad(d.getMonth()+1), d.getDate()].join('-');
					}

				    var latest = new Date(Math.max.apply(null,dates));

				    var d = new Date(latest);
					var date = d.getUTCDate();
					var month = d.getUTCMonth() + 1;
					var year = d.getUTCFullYear();

					var finalDate = month + '-' + date + '-' + year;

					var todayDate = new Date()
					var currentDate = todayDate.getUTCDate();
					var currentMonth = todayDate.getUTCMonth() + 1;
					var currentYear = todayDate.getUTCFullYear();

					var currentFinalDate = currentMonth + '-' + currentDate + '-' + currentYear;


					Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
						var one_day=1000*60*60*24;    // Convert both dates to milliseconds
						var date1_ms = date1.getTime();
						var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
						var difference_ms = Math.abs(date2_ms - date1_ms);        // Convert back to days and return
						if (difference_ms < one_day) {
							return 0;
						}
						else {
							return Math.round(difference_ms/one_day);
						}
					}


 					var daysSinceLastSubmission = Date.daysBetween(d,todayDate)

					Student.findOneAndUpdate({email: student.email}, {$set:{lastSubmittedAssignment:finalDate}}, {new: true}, function(err, doc){
					    if(err){
					        console.log("Something wrong when updating student data!");
					    }

					});

					Student.findOneAndUpdate({email: student.email}, {$set:{daysInactive:daysSinceLastSubmission}}, {new: true}, function(err, doc){
					    if(err){
					        console.log("Something wrong when updating student data!");
					    }

					});
				    resolve(students:allStudentsList );

				  });
				});
			});
		});

	});

}
