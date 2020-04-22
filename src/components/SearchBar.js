import React, { Component } from 'react'
import './searchbar.css'
import {Link} from 'react-router-dom'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTxt: ''
        }
        this.onChangeTxt = this.onChangeTxt.bind(this)
    }

    onChangeTxt(txt) {
        this.setState({searchTxt: txt})
    }

    render() {
        return (
            <div className="example">
                <input type="text" placeholder="search your recipes ..." name="search" value={this.state.searchTxt} onChange={(e) => this.onChangeTxt(e.target.value)}/>
                <Link to={'/cuisine/search/' + this.state.searchTxt}>
                    <button type="submit"><i className="fa fa-search"></i></button>
                </Link>
            </div>
        )
    }
}