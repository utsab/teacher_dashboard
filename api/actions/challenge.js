var request = require('request');

export default function challenge() {
  var freeCodeCampUrl = 'https://www.freecodecamp.com/challenges/delete-html-elements#?solution=%0A%0A%0A%3Ch2%3ECatPhotoApp%3C%2Fh2%3E%0A%0A%3Cp%3EKitty%20ipsum%20dolor%20sit%20amet%2C%20shed%20everywhere%20shed%20everywhere%20stretching%20attack%20your%20ankles%20chase%20the%20red%20dot%2C%20hairball%20run%20catnip%20eat%20the%20grass%20sniff.%3C%2Fp%3E%0A'
  var challengeName = freeCodeCampUrl.split('s/')[1].split('#')[0]
  var solution = freeCodeCampUrl.split('=')[1]
  var scraperChallengeUrl = 'https://fcc-profile-scraper.herokuapp.com/challenge/'

  return new Promise((resolve) => {
    var challenge = { title: '', description: '', solution: '' }
    request(scraperChallengeUrl + challnegeName, function (error, response, body){
      console.log(body)
      var body = JSON.parse(body)
      console.log(body.title)
      body.instructions.forEach
      console.log(body.instructions.forEach)
    })
    resolve({
      title: 'challnege title',
      description: 'challenge description',
      solution: 'challenge solution'
    });
  });
}
