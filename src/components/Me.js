import React, {Component} from 'react';
import '../style.css'

export default class France extends Component {
    changeUrl() {
        var i = Math.floor((Math.random() * 36) + 1);
        document.getElementById('image').src = '/getRandomImage/' + i.toString();
    }
    render() {
        return (
            <div className="center">
                <h1 id="bienvenue">WELCOME to my SPECIAL GUEST</h1>
                <h5 id="title">Let's relax with this picture ^^</h5>
                <button id="button" onClick={this.changeUrl}>Click me</button>
                <br/>
                <img src='/getRandomImage/1' id="image"/>
            </div>
        )
    }
}