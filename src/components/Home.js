import React, {Component} from 'react';
import "../style.css"


export default class Home extends Component {
    componentDidMount() {
        setInterval(() => {
            var i = Math.floor((Math.random() * 10) + 1);
            var source = '/' + i.toString() + '.jpg'
            var image = document.getElementById('image')
            image.src = source
        }, 8000);
    }

     render() {
        return (
            <div className="center">
                <h1 id="bienvenue">BIENVENUE À MON PAGE</h1>
                <h2 id="name">- OWEN CHẤN NAM NGUYỄN - </h2>
                <h4 id="title">Un voyageur - a food lover</h4>
                <br/>
                <img src='/17.jpg' id="image"/>
            </div>
        )
    }
}