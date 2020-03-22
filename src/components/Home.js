import React, {Component} from 'react';
import "../style.css"


export default class Home extends Component {
    render() {
        return (
            <div className="center">
                <h1 id="bienvenue">BIENVENUE À MON PAGE</h1>
                <h2 id="name">- OWEN CHẤN NAM NGUYỄN - </h2>
                <h4 id="title">Un voyageur - a food lover</h4>
                <br/>
                <img src='/0.jpg' />
            </div>
        )
    }
}