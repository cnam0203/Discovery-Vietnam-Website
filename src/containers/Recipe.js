import React, { Component } from 'react'
import './recipe.css'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                id: 1234,
                name: 'Bánh mì',
                time: '1h30min',
                level: 'Difficult',
                src: '/pho-br.png',
                like: 13,
                serve: 4,
                ingredients: [
                    {
                        part: 'WHISK TOGETHER',
                        partIngredient: [
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                        ]
                    },
                    {
                        part: 'WHISK TOGETHER',
                        partIngredient: [
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                        ]
                    },
                    {
                        part: 'WHISK TOGETHER',
                        partIngredient: [
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                            {
                                amount: 1,
                                unit: 'kg',
                                name: 'pork belly'
                            },
                        ]
                    }
                ],
                direction: [
                    {
                        step: 1,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    },
                    {
                        step: 2,
                        kind: 1,
                        content: '/pho-br.png'
                    },
                    {
                        step: 3,
                        kind: 2,
                        content: 'H1. Pho bo'
                    },
                    {
                        step: 4,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    },
                    {
                        step: 5,
                        kind: 1,
                        content: '/banhmi.jpg'
                    },
                    {
                        step: 6,
                        kind: 2,
                        content: 'H1. Pho bo'
                    },
                    {
                        step: 7,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    },
                    {
                        step: 8,
                        kind: 1,
                        content: '/pho-br.png'
                    },
                    {
                        step: 9,
                        kind: 2,
                        content: 'H1. Pho bo'
                    },
                    {
                        step: 10,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    },
                    {
                        step: 11,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    },
                    {
                        step: 12,
                        kind: 0,
                        content: 'Keep it warm and then slice into 3 pieces'
                    }
                ]
            }
        }
    }
    componentDidMount() {
        // const url = '/getRecipeInfo' + this.props.match.params.id;
        // const method = 'GET'
        // fetch(url, method)
        // .then((res) => this.setState({recipe: res}))
        // .catch((err) => alert(err))
    }

    render() {

        const { recipe } = this.state
        return (
            <div className="recipe-container">
                <div className='recipe-header'>
                    <Logo />
                    <Navigator />
                    <SearchBar />
                </div>
                <div className="recipe">
                    <p className="name-recipe">{recipe.name}</p>
                    <img src={recipe.src} className="img-recipe"/>
                    <div className="left-col">
                        <div className="descript">
                            <div className="time"><b className="property">READY IN: </b>{recipe.time}</div>
                            <div className="level"><b className="property">LEVEL: </b>{recipe.level}</div>
                            <div className="serve"><b className="property">SERVES: </b>{recipe.serve}</div>
                            <div className="like"><b className="property">LIKES: </b>{recipe.like}</div>
                        </div>
                        <div className="ingredients">
                            <p className="ingredient-title">INGREDIENTS</p>
                            <div className="list-recipe">
                                {
                                    recipe.ingredients.map((ingredient, index) => {
                                        return typeof(ingredient.part) === "undefined" ? (
                                        <div className="ingredient" key={index}>
                                            <div className="amount">{ingredient.amount}</div>
                                            <div className="unit">{ingredient.unit}</div>
                                            <div className="ingredient-name">{ingredient.name}</div>
                                        </div>
                                        ) : (
                                            <div className="parts" key={index}>
                                                <p className="part-name">{ingredient.part}</p>
                                                {
                                                    ingredient.partIngredient.map((item, index) => {
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
                            </div>
                        </div>
                    </div>
                    <div className="right-col">
                        <p className="direction-title">DIRECTIONS</p>
                        {
                            (recipe.direction.sort((a, b) => (a.step > b.step) ? 1 : -1)).map((item, index) => {
                                if (item.kind == 0) {
                                    return (
                                        <p className="content-recipe" key={index}>{item.content}</p>
                                    )
                                } else  {
                                    return (
                                        <div key={index} style={{width: '100%'}}>
                                            <img src={item.content} className="img-step"/>
                                            <p className="description-img">{item.content}</p>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}