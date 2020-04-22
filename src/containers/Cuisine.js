import React, { Component } from 'react'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import './cuisine.css'
import './searchrecipe.css'
import '../style.css'
import RecipePreview from '../components/RecipePreview'
import SignIn from '../components/SignIn'
import SignInModal from '../components/SignInModal'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import AddRecipeButton from '../components/AddRecipeButton'


class Cuisine extends Component {
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
                if (res.errors == undefined) {
                    this.setState({listRecipes: res.recipes})
                }
            }
        )
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
                    <SignIn isSignIn={this.props.isSignIn}/>
                    <SignInModal isShowModal={this.props.isShowModal}/>
                    <p className='region' id='north' style={{position: 'absolute', left: '28%', top: '40%'}}>North</p>
                    <p className='region' id='center' style={{position: 'absolute', left: '43%', top: '50%'}}>Center</p>
                    <p className='region' id='south' style={{position: 'absolute', left: '60%', top: '60%'}}>South</p>
                    <AddRecipeButton />
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

const mapStateToProps = (state) => {
    return {
        isSignIn: state.isSignIn,
        isShowModal: state.isShowModal
    }
}

export default connect(mapStateToProps)(Cuisine)