import React, {Component} from 'react';
import "../style.css"
import { BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom'

export default class MenuLink extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnly} children={({match}) => {
                var active = match ? 'my-link' : 'none';
                return (
                    <nav className="menu">
                             <NavLink className={active} to={this.props.to}>{this.props.label}</NavLink>
                    </nav>
                )
            }}/>
        )
    }
}