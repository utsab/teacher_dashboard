var request = require('request');

export default function loadChallenge(req, body) {
  var url = req.url;
  var freeCodeCampBaseUrl = 'https://www.freecodecamp.com/challenge';
  var challengeName = url.split('=')[1].split('?')[0].split('s/')[1];
  var solution = url.split('=')[2];
  var scraperChallengeBaseUrl = 'https://fcc-profile-scraper.herokuapp.com/challenge/';

  return new Promise((resolve, reject) => {
    var challenge = { title: '', description: '', solution: '' };
    var body = {};
    request(scraperChallengeBaseUrl + challengeName, function (error, response, body){
      if (error) {
        throw error;
        reject();
      }
      body = JSON.parse(body);
      if (!body.instruction) {
        body.instruction = freeCodeCampBaseUrl;
      }
      resolve({
        title: body.title,
        description: body.instruction,
        solution: decodeURIComponent(solution)
      });
    });
  });
}
