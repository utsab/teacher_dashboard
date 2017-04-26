var mongoose = require('mongoose'); //mongo connection
var passwordHash = require('password-hash');

export default function login(req, err, model) {	
	const Teacher = model.teachers;
	const user = {
	    email: req.body.email,
	    password: req.body.password
	};

 	return new Promise((resolve,reject) => {
	 	console.log('in login function');
	 	Teacher.findOne({ 'email': user.email }, function (err, person) {
			if (err) {
				reject(new Error('fail!!!!!!!!!!!!!!!!!!!!!!!!!!in person===null'));
			} 
			else if(person == null) {
				console.log("There is an error in login!!!!");
				reject(new Error('user not found'));
			}
			else {
				if((passwordHash.verify(user.password, person.password))) { // true
					user.name = person.name;
					user.username = person.username;
					req.session.user = user;
				  	resolve(user);
				}
				else {
					reject(new Error('email and password do not match'));
				}

			 }
		});
	});
};


// 	Teacher.findOne({ 'email': user.email }, function (err, person) {
// 		if (err) {
// 			console.log("There is an error in login!!!!");
// 			console.log(err);
// 			throw err;
// 		} 
// 		else {
// 			console.log("*************************************");
// 			console.log(user);
// 			console.log(person);
// 			console.log(passwordHash.verify(user.password, person.password)); // true
// 			user.name = person.name;
// 			user.username = person.username;
// 			console.log(user);
// 			console.log("user: in login function!!!");
// 			req.session.user = user;
// 		  	return Promise.resolve(user);
// 		  }
// 	})
// }





// var mongoose = require('mongoose'); //mongo connection
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;


// export default function login(req, err, model) {
// 		console.log(passport);
// 		console.log("LOGIN!!**********");
// 		const Teacher = model.teachers;
// 		const users = {
// 		    name: req.body.name,
// 		    username: req.body.username,
// 		    email: req.body.email,
// 		    password: req.body.password
// 		};
// 		// return Promise.resolve(users);
// 		// const username = users.username;
// 		// const password = users.password;
// 		passport.use(new LocalStrategy(
// 		  function(username, done) {
// 		  	console.log("134433");
// 		  	console.log("yolo!!!!!!!!!!!!!!!!!!!!!!!");
// 		    Teacher.findOne({ username: username }, function (err,user) {
// 		      return Promise.resolve(users);
// 		    });
// 		  }
// 		))
		// passport.use(new LocalStrategy(
		//   function(username, password, done) {
		//   	console.log("134433");
		//   	const Teacher = model.teachers;
		//   	console.log("yolo!!!!!!!!!!!!!!!!!!!!!!!");
		//     Teacher.findOne({ username: username }, function (err,user) {
		//       return Promise.resolve(user);
		//     });
		//   }
		// ))
	// }
// }






// export default function (passport) {
//     passport.use("login", getStrategy(login))
// }

// function getStrategy (done) {
//     return new LocalStrategy({
//         usernameField : "username"
//         , passwordField : "password"
//         , passReqToCallback : true
//     }, done)
// }

// function login (req, err, model, username, password, done) {
// 	const Teacher = model.teachers;
//     Teacher.findOne({ username: username })
//     .then((user) => {
//         if (!user) {
//             throw new Error('User not found in database.')
//         } else {
//             console.log("yolo!");
//         }
//     }).then((state) => {
//             return Promise.resolve(user)
//     }).then((user) => {
//         return done(null, user)
//     }).catch((err) => {
//         return done(null, false, req.flash('message', err.message || err))
//     })
// }




