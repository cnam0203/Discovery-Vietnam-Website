import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Home from './containers/Home'
import Cuisine from './containers/Cuisine'
import NotFound from './containers/NotFound'
import SearchRecipe from './containers/SearchRecipe'
import './style.css'
import 'font-awesome/css/font-awesome.min.css'



export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/cuisine" exact component={Cuisine} />
                    <Route exact path="/cuisine/:id" component={SearchRecipe} />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        )
    }
}