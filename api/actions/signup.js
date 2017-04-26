var mongoose = require('mongoose'); //mongo connection
var passwordHash = require('password-hash');

export default function signup(req, err, model) {
	console.log("PASSWORD!!!!!");
	var hashedPassword = passwordHash.generate(req.body.password);
	console.log(hashedPassword);
	console.log(passwordHash.isHashed(req.body.password)); // false
    console.log(passwordHash.isHashed(hashedPassword)); // true

	const Teacher = model.teachers;
	const user = {
	    name: req.body.name,
	    username: req.body.username,
	    email: req.body.email,
	    password: hashedPassword
	};

	Teacher.create({ name:user.name, username:user.username, email:user.email, password: hashedPassword}, function (err, createdUser) {
	    if(err) {
			throw err;
		}
	});
	req.session.user = user;
  	return Promise.resolve(user);
}




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




