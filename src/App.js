import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
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
                <MenuLink label='Contact' to='/contact' activeOnly={true}/>
                <MenuLink label='About' to='/about' activeOnly={false}/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path='/about' component={About} />
                    <Route component={NotFound}/>
                </Switch>
                <div id="my-link">Hello các bạn</div>
                <p className="my-link">Hello bạn trẻ</p>

            </Router>
        )
    }
}