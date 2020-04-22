import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Home from './containers/Home'
import Cuisine from './containers/Cuisine'
import NotFound from './containers/NotFound'
import SearchRecipe from './containers/SearchRecipe'
import Recipe from './containers/Recipe'
import AddRecipe from './containers/AddRecipe'
import './style.css'
import 'font-awesome/css/font-awesome.min.css'



export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cuisine" exact component={Cuisine} />
                    <Route path="/cuisine/addrecipe" exact component={AddRecipe} />
                    <Route path="/cuisine/search/:id" exact component={SearchRecipe} />
                    <Route path="/cuisine/recipe/:id" exact component={Recipe} />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}