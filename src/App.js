import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Home from './components/Home'
import NotFound from './components/NotFound'
import './style.css'

const MenuLink = ({label, to, activeOnly}) => {
    return (
        <Route path={to} exact={activeOnly} children={({match}) => {
            var active = match ? 'my-link' : 'none';
            return (
                <nav className="menu">
                    <h5>
                         <NavLink className={active} to={to}>{label}</NavLink>
                    </h5>
                </nav>
            )
        }}/>
    )
}


export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route component={NotFound}/>
                </Switch>

            </Router>
        )
    }
}