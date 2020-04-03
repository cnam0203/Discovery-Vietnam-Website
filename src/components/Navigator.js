import React, { Component } from 'react'
import './navigator.css'
import MenuLink from './MenuLink'

const Navigator = () => {
    return (
        <div id='select'>
            <MenuLink label='Home' to='/' activeOnly={true}/>
            <MenuLink label='History' to='/history' activeOnly={false}/>
            <MenuLink label='Culture' to='/culture' activeOnly={false}/>
            <MenuLink label='Cuisine' to='/cuisine' activeOnly={false}/>
            <MenuLink label='Music' to='/music' activeOnly={false}/>
            <MenuLink label='Beauty' to='/beauty' activeOnly={false}/>
        </div>
    )
}

export default Navigator