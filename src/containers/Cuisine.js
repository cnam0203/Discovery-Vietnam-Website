import React, { Component } from 'react'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import './cuisine.css'
import './searchrecipe.css'
import '../style.css'


export default class Cuisine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: '',
            listRecipes: [{
                id: 1234,
                url: '/pho-br.jpg',
                name: 'PHỞ',
                likes: 12,
                level: 'Difficult',
                time: '1h30min'
            }, {
                id: 1234,
                url: '/caolau.jpg',
                name: 'Cao lầu',
                likes: 12,
                level: 'Easy',
                time: '1h15min'
            }, {
                id: 1234,
                url: '/com-ga.png',
                name: 'CƠM GÀ',
                likes: 12,
                level: 'Easy',
                time: '1h'
            }, {
                id: 1234,
                url: '/banhmi.jpg',
                name: 'Bánh mì',
                likes: 12,
                level: 'Easy',
                time: '45min'
            }, {
                id: 1234,
                url: '/pho-br.jpg',
                name: 'BANH MI',
                likes: 12,
                level: 'Easy',
                time: '12s'
            }, {
                id: 1234,
                url: '/pho-br.jpg',
                name: 'BANH MI',
                likes: 12,
                level: 'Easy',
                time: '12s'
            }, {
                id: 1234,
                url: '/pho-br.jpg',
                name: 'BANH MI',
                likes: 12,
                level: 'Easy',
                time: '12s'
            }, {
                id: 1234,
                url: '/pho-br.jpg',
                name: 'BANH MI sdfadsfdsfd',
                likes: 12,
                level: 'Easy',
                time: '12s'
            }]
        }
    }

    componentDidMount() {
        $(document).ready(function(){
            $("#north").mouseover(function(){
                $("#pho-br").css("animation", "slideshow 2s forwards");
            });
       });

       $(document).ready(function(){
            $("#north").mouseleave(function(){
                $("#pho-br").css("animation", "slidesout 2s forwards");
            });
        });
        $(document).ready(function(){
            $("#south").mouseover(function(){
                $("#banhmi").css("animation", "slideshow 2s forwards");
            });
        });
        $(document).ready(function(){
            $("#center").mouseleave(function(){
                $("#com-ga").css("animation", "slidesout 2s forwards");
            });
        });
        $(document).ready(function(){
            $("#center").mouseover(function(){
                $("#com-ga").css("animation", "slideshow 2s forwards");
            });
        });

       $(document).ready(function(){
            $("#south").mouseleave(function(){
                $("#banhmi").css("animation", "slidesout 2s forwards");
            });
        });
    }


    render() {
        return (
            <div>
                <div id='container-cuisine'>
                    <img src='/buncha.png' id='pho-br' />
                    <img src='/banhmi.jpg' id='banhmi' />
                    <img src='/com-ga.png' id='com-ga' />
                    <Navigator />
                    <Logo />
                    <SearchBar />
                    <p className='region' id='north' style={{position: 'absolute', left: '28%', top: '40%'}}>North</p>
                    <p className='region' id='center' style={{position: 'absolute', left: '43%', top: '50%'}}>Center</p>
                    <p className='region' id='south' style={{position: 'absolute', left: '60%', top: '60%'}}>South</p>
                    <i className="fa fa-pencil"  id="add-recipe"style={{position: 'absolute', right: '5%', bottom: '5%'}}
                        onClick={() =>{ window.location.href = '/cuisine/addrecipe'}}><b id="add-recipe-text">Add a recipe</b></i>
                </div>
                <div id="list-result">
                    {
                        this.state.listRecipes.map((item, index) => {
                            return (
                                <div className="recipes-search" key={index} onClick={() => { window.location.href = '/cuisine/recipe/' + (item.id).toString()}}>
                                    <img src={item.url} className="img-recipe-search"/>
                                    <div className="name-search">{item.name}</div>
                                    <div className="footer">
                                        <div className="likes-search">
                                            <i className="fa fa-heart icon"></i>
                                            {item.likes}</div>
                                        <div className="level-search">
                                            <i className="fa fa-apple icon"></i>
                                            {item.level}</div>
                                        <div className="time-search">
                                            <i className="fa fa-clock-o icon"></i>
                                            {item.time}</div>
                                    </div>
                                    <div className="share">
                                    <i className="fa fa-share icon-share"></i>share</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}