import React, { Component } from 'react'
import Logo from '../components/Logo'
import Navigator from '../components/Navigator'
import SearchBar from '../components/SearchBar'
import RecipePreview from '../components/RecipePreview'
import './searchrecipe.css'


export default class SearchRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listRecipes: []
        }
    }

    componentDidMount() {
        fetch('/getRecipes', {
            method: 'GET'
        })
        .then((res) =>
            res.json())
        .then((res) => {
            console.log(Object.keys(res.recipes[0]))
            this.setState({listRecipes: res.recipes})})
        .catch((err) => console.log(err))

        $(document).ready(function(){
            $("#north").mouseover(function(){
                $("#pho-br").css("animation", "slideshow 2s forwards");
            });
       });
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
                                <RecipePreview key={index} index={item._id} item={item.recipe}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}