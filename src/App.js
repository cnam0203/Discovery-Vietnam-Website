import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Home from './components/Home'
import France from './components/France'
import Uk from './components/Uk'
import Usa from './components/Usa'
import Nature from './components/Nature'
import Me from './components/Me'
import NotFound from './components/NotFound'
import './style.css'

const MenuLink = ({label, to, activeOnly}) => {
    return (
        <Route path={to} exact={activeOnly} children={({match}) => {
            var active = match ? 'my-link' : '';
            return (
                <li className={active}>
                    <NavLink className={active} to={to}>{label}</NavLink>
                </li>
            )
        }}/>
    )
}


export default class App extends Component {
    render() {
        return (
            <Router>
                <MenuLink label='Home' to='/' activeOnly={true}/>
                <MenuLink label='FRANCE' to='/france' activeOnly={true}/>
                <MenuLink label='USA' to='/usa' activeOnly={false}/>
                <MenuLink label='UK' to='/uk' activeOnly={false}/>
                <MenuLink label='NATURE' to='/nature' activeOnly={false}/>
                <MenuLink label='ME' to='/me' activeOnly={false}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path='/france' component={France} />
                    <Route path='/usa' component={Uk} />
                    <Route path='/uk' component={Usa} />
                    <Route path='/nature' component={Nature} />
                    <Route path='/me' component={Me} />
                    <Route component={NotFound}/>
                </Switch>

            </Router>
        )
    }
}