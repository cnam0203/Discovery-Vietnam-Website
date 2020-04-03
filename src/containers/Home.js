import React, {Component} from 'react';
import "../style.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import MenuLink from '../components/MenuLink'
import Button from '../components/Button'



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.scrollDown = this.scrollDown.bind(this)
        this.state = {
            index: 0
        }
    }

    componentDidMount() {
        const parallax = document.getElementById('parallax');
        window.addEventListener("scroll", function() {
            let offset = window.pageYOffset;
            parallax.style.backgroundPositionY = offset*0.7 + "px";
        })
        AOS.init();
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

        setInterval(() => {
            if (this.state.index == 0) {
                this.setState({index: 1})
            }
            else if (this.state.index == 1) {
                this.setState({index: 2})
            }
            else {
                this.setState({index: 0})
            }
        }, 8000)
    }

    scrollDown() {
        console.log('hello')
        $('html, body').animate({scrollTop: $(document.getElementById('history')).offset().top }, 'slow');
    }

     render() {
        return (
            <div>
            <div className="container-home" id="parallax">
                <div> 
                        <div id="select">
                            <MenuLink label='Home' to='/' activeOnly={true}/>
                            <MenuLink label='History' to='/history' activeOnly={false}/>
                            <MenuLink label='Culture' to='/culture' activeOnly={false}/>
                            <MenuLink label='Cuisine' to='/cuisine' activeOnly={false}/>
                            <MenuLink label='Music' to='/music' activeOnly={false}/>
                            <MenuLink label='Beauty' to='/beauty' activeOnly={false}/>
                        </div>
                        <img src='/logo.png' id="logo"/>
                        <div id="title-container">
                            <p className='title'>A glimpse of Vietnam</p>
                            <p className="quote">- Let's taste new experiences -</p>
                        </div>
                        <div class="scroll-down" onClick={() => this.scrollDown()}></div>
                </div>
            </div>
                <div className="home-body">
                    <section>
                        <div className="container" id="history">
                            <img src="/hanoi.png" id="mienbac" data-aos="fade-left" style={{display : this.state.index == 0 ? 'block' : 'none'}}/>
                            <img src="/hue.png" id="mientrung" style={{display : this.state.index == 1 ? 'block' : 'none'}}/>
                            <img src="/saigon.png" id="miennam" style={{display : this.state.index == 2 ? 'block' : 'none'}}/>
                            <div className="box left" data-aos="fade-up" >
                                <h1>HISTORY</h1>
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <Button title="Let's go" path='/history' color='white'/>
                            </div>
                        </div>
                    </section>
                    <div className="container" id="people">
                        <img src='./3mien.png' className="people-img" data-aos="fade-right" style={{width: '30%', bottom: '10%', left: '5%'}}/>
                        <img src='./dantoc.png' className="people-img" data-aos="fade-left" style={{width: '58%', bottom: '10%', left: '38%'}}/>
                        <div className="box middle" data-aos="fade-down">
                            <h1>PEOPLE</h1>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button title="Let's go" path='/people' color='black'/>
                        </div>
                    </div>
                    <div className="container" id="life">
                        <img src='./life.png' className="life-img" data-aos="fade-up" style={{width: '100%', bottom: '0%'}}/>
                        <div className="box right" data-aos="fade-down">
                            <h1>LIFE</h1>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button title="Let's go" path='/life' color='white'/>
                        </div>
                    </div>
                    <div className="container" id="culture">
                        <img src='./trongdong.png' className="culture" data-aos="fade-up" style={{left: '15%', width: '15%', bottom: '20%'}}/>
                        <img src='./danco.png' className="culture" data-aos="fade-down" style={{left: '28%', width: '15%', bottom: '20%'}}/>
                        <img src='./nonla.png' className="culture" data-aos="fade-up" style={{left: '45%', width: '15%', bottom: '20%'}}/>
                        <img src='./tranhdongho.png' className="culture" data-aos="fade-down" style={{left: '65%', width: '15%', bottom: '20%'}}/>
                        <img src='./aodai.png' className="culture" data-aos="fade-up" style={{left: '85%', width: '15%', bottom: '10%'}}/>
                        <div className="box left" data-aos="fade-right" >
                            <h1>CULTURE</h1>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button title="Let's go" path='/culture' color='black'/>
                        </div>
                    </div>
                    <div className="container" id="cuisine">
                        <img src="/pho.png" id='pho' className="rotate" data-aos="fade-down"/>
                        <img src="/ot.png" id="ot" data-aos="fade-left"/>
                        <img src="/tuong.png" id="tuong" data-aos="fade-left" />
                        <img src="/muong.png" id="muong" data-aos="fade-right" />
                        <img src="/doidua.png" id="doidua" data-aos="fade-up"/>
                        <div className="box right" data-aos="fade-left">
                            <h1>CUISINE</h1>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button title="Let's go" path='/cuisine' color='white'/>
                        </div>
                    </div>
                    <div className="container" id="music">
                        <img src='./nhacsi.png' className="music-img" data-aos="fade-up" style={{left: '5%', width: '25%', bottom: '70%'}}/>
                        <img src='./baihat.png' className="music-img" data-aos="fade-down" style={{left: '10%', width: '25%', bottom: '30%'}}/>
                        <img src='./casi.png' className="music-img" data-aos="fade-up" style={{left: '30%', width: '25%', bottom: '7%'}}/>
                        <div className="box right" data-aos="fade-down">
                            <h1>MUSIC</h1>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            <Button title="Let's go" path='/music' color='black'/>
                        </div>
                    </div>
                    <div className="container" id="landscape">
                        <img src='/logo2.png' id="logo2"/>
                        <img src='./thuyen1.png' id="thuyen1" className="landscape-img"  style={{width: '10%', bottom: '25%', left: '5%'}}/>
                        <img src='./thuyen2.png' id="thuyen2" className="landscape-img"  style={{width: '10%', bottom: '10%', left: '85%'}}/>
                        <div className="box bay" data-aos="fade-left">
                            <h1>NATURAL BEAUTY</h1>
                            <p>
                            Lorem Ipsum is simply dummy text 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}