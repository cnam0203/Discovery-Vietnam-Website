import React, { Component } from 'react'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import './cuisine.css'
import './searchrecipe.css'
import '../style.css'
import RecipePreview from '../components/RecipePreview'


export default class Cuisine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: '',
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
                                <RecipePreview key={index} index={item._id} item={item.recipe}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}