import './logo.css'
import React, { Component } from 'react'


const Logo = () => {
    return (
        <img src='/logo.png' id="logo" onClick={() => window.location.href = '/'}/>
    )
}

export default Logo