import React, {Component} from 'react';

const url = 'https://fcc-profile-scraper.herokuapp.com/user/user512';

const challenge = 'https://www.freecodecamp.com/challenges/say-hello-to-html-elements#?solution=%0A%3Ch1%3EHello%20World%3C%2Fh1%3E%0A';

export default class Dashboard extends Component {


  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <a href={url}>student json data</a>
        <iframe src={challenge}></iframe>
      </div>
    );
  }
}
