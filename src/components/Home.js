import React, {Component} from 'react';
import "../style.css"


export default class Home extends Component {
    componentDidMount() {
        setInterval(() => {
            var i1 = Math.floor((Math.random() * 22) + 1);
            var source1 = '/' + i1.toString() + '.jpg'
            var image1 = document.getElementById('image1')
            image1.src = source1
            var i2 = Math.floor((Math.random() * 22) + 1);
            var source2 = '/' + i2.toString() + '.jpg'
            var image2 = document.getElementById('image2')
            image2.src = source2
        }, 19000);
    }

     render() {
        return (
            <div className="center">
                <h1 id="bienvenue">BIENVENUE À MON PAGE</h1>
                <h2 id="name">- OWEN CHẤN NAM NGUYỄN - </h2>
                <h4 id="title">Un voyageur - a food lover</h4>
                <br/>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src="/0.jpg" alt="Avatar" id="image1"/>
                        </div>
                        <div className="flip-card-back">
                            <img src="/1.jpg" alt="Avatar" id="image2"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}