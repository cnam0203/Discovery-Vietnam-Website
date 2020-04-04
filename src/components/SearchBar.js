import React, { Component } from 'react'
import './searchbar.css'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTxt: ''
        }
        this.onChangeTxt = this.onChangeTxt.bind(this)
        this.onSearchTxt = this.onSearchTxt.bind(this)
    }

    onChangeTxt(txt) {
        this.setState({searchTxt: txt})
    }

    onSearchTxt() {
        window.location.href = '/cuisine/search/' + this.state.searchTxt
    }

    render() {
        return (
            <div className="example">
                <input type="text" placeholder="Search your recipes ..." name="search" value={this.state.searchTxt} onChange={(e) => this.onChangeTxt(e.target.value)}/>
                <button type="submit" onClick={() => this.onSearchTxt()}><i className="fa fa-search"></i></button>
            </div>
        )
    }
}