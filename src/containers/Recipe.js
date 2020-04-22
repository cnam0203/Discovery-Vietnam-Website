import React, { Component } from 'react'
import './recipe.css'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import SignIn from '../components/SignIn'
import SignInModal from '../components/SignInModal'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import AddRecipeButton from '../components/AddRecipeButton'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
        }
    }
    componentDidMount() {
        const url = '/getRecipeInfo/' + this.props.match.params.id;
        fetch(url, {method: 'GET'})
        .then((res) => res.json())
        .then((res) => res.errors === undefined ? this.setState({recipe: res.recipe}) : null)
        .catch((err) => alert(err))
    }

    render() {

        const { recipe } = this.state
        return (
            <div className="recipe-container">
                <div className='recipe-header'>
                    <Logo />
                    <Navigator />
                    <SearchBar />
                    <SignIn isSignIn={this.props.isSignIn}/>
                    <SignInModal isShowModal={this.props.isShowModal}/>
                    <AddRecipeButton />
                </div>
                {
                    recipe != null ? (
                        <div className="recipe">
                                            <p className="name-recipe">{recipe.name}</p>
                                            <img src={recipe.imgUrl} className="img-recipe"/>
                                            <div id="recipe-title">
                                                <p id="ingredient-title">DESCRIPTION</p>
                                                <p style={{margin: 0, textAlign: 'center'}}>{recipe.description}</p>
                                            </div>
                                            <div className="left-col">
                                                <div className="descript">
                                                    <div className="time"><b className="property">READY IN: </b>{recipe.time}</div>
                                                    <div className="level"><b className="property">LEVEL: </b>{recipe.level}</div>
                                                    <div className="serve"><b className="property">SERVES: </b>{recipe.serves}</div>
                                                    <div className="like"><b className="property">LIKES: </b>{recipe.like}</div>
                                                </div>
                                                <div className="ingredients">
                                                    <p className="ingredient-title">INGREDIENTS</p>
                                                    <div className="list-recipe">
                                                        {
                                                            recipe.parts.map((part, index) => {
                                                                return (
                                                                    <div className="parts" key={index}>
                                                                        <p className="part-name">{part.name}</p>
                                                                        {
                                                                            part.ingredients.map((item, index) => {
                                                                                return (
                                                                                    <div className="ingredient" key={index}>
                                                                                        <div className="amount">{item.amount}</div>
                                                                                        <div className="unit">{item.unit}</div>
                                                                                        <div className="ingredient-name">{item.name}</div>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    )
                                                            })
                                                        }
                                                        {
                                                            recipe.ingredients.map((ingredient, index) => {
                                                            return (
                                                                <div className="ingredient" key={index}>
                                                                    <div className="amount">{ingredient.amount}</div>
                                                                    <div className="unit">{ingredient.unit}</div>
                                                                    <div className="ingredient-name">{ingredient.name}</div>
                                                                </div>
                                                                )
                                                            })
                                                        } 
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="right-col">
                                                <p className="direction-title">DIRECTIONS</p>
                                                {
                                                    recipe.directions.map((item, index) => {
                                                        if (item.kind == 0) {
                                                            return (
                                                                <p className="content-recipe" key={index}>{item.content}</p>
                                                            )
                                                        } else  {
                                                            return (
                                                                <div key={index} style={{width: '100%'}}>
                                                                    <img src={item.img} className="img-step"/>
                                                                    <p className="description-img">{item.title}</p>
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }
                                            </div>
                                        </div>
                    ) : null
                }
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

export default connect(mapStateToProps)(Recipe)