var http = require('http');


export default function validateGithubUsername(usrName, handleResult) {
	var options = {
			  host: 'fcc-profile-scraper.herokuapp.com',
			  port: 80,
			  path: '/user/' + usrName
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
	  		console.log("Github is invalid!...."); 
	  		 handleResult(false)
	  	} else {
	  		// Assume request succeeded
	  		console.log("Github is valid!...."); 
	  		handleResult(true)
	  	}


	  });


	}).on("error", function(e){
	  console.log("Got error:^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ " + e.message);
	});
}