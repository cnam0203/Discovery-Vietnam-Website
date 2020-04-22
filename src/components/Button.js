import React, { Component } from 'react'
import './button.css'

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='container' style={{
                background: this.props.color === 'white' ? '#000' : '#fff',
                color: this.props.color === 'white' ? '#fff' : '#000'}} 
                onMouseOver={(e) => {
                    e.target.style.background = '#FFCC57'
                    e.target.style.color = '#fff'}}
                onMouseLeave={(e) => {
                    e.target.style.background = this.props.color === 'white' ? '#000' : '#fff',
                    e.target.style.color = this.props.color === 'white' ? '#fff' : '#000'
                    }}
                onClick={() => {window.location.href = this.props.path}}>
                {this.props.title}
            </div>
        )
    }
}