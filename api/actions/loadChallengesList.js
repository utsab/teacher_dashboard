var request = require('request');

export default function loadChallengesList() {
  var scraperUserBaseUrl = 'https://fcc-profile-scraper.herokuapp.com/user/';
  var scraperUserUrl= scraperUserBaseUrl + 'user512';

  return new Promise((resolve, reject) => {

    request(scraperUserUrl, function (error, response, body){
      if (error) {
        throw error;
        reject();
      }
      // TODO: error handling,  body or completedChallenge might not happend
      body = JSON.parse(body);
      resolve(
        body.completedChallenges
      );
    });
  });
}
