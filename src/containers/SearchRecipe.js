import React, { Component } from 'react'
import Logo from '../components/Logo'
import Navigator from '../components/Navigator'
import SearchBar from '../components/SearchBar'
import './searchrecipe.css'


export default class SearchRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        // const url = '/getReicpes/' + this.props.match.params.id;
        // const method = 'GET'
        // fetch(url, method)
        // .then((res) => {
        //     this.setState({listRecipes: res})
        // })
        // .catch((err) => {
        //     alert(err)
        // })
    }

    render() {
        return (
            <div className="search-recipe-container">
                <div className='search-recipe-header'>
                    <Logo />
                    <Navigator />
                    <SearchBar />
                </div>
        <p id="result">{`There are total `}<strong>{this.state.listRecipes.length}</strong>{` recipe results for "`}<strong>{this.props.match.params.id}</strong>{`"`}</p>
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