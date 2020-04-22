import React, { Component } from 'react'
import '../containers/searchrecipe.css'
import {Link} from 'react-router-dom'

const RecipePreview = (props) => {
    return (
        <Link to={'/cuisine/recipe/' + props.index.toString()} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <div className="recipes-search">
                <img src={props.item.imgUrl} className="img-recipe-search"/>
                <div className="name-search">{props.item.name}</div>
                <div className="footer">
                    <div className="likes-search">
                        <i className="fa fa-heart icon"></i>
                        {0}</div>
                    <div className="level-search">
                        <i className="fa fa-apple icon"></i>
                        {props.item.level}</div>
                    <div className="time-search">
                        <i className="fa fa-clock-o icon"></i>
                        {props.item.time}</div>
                    <div className="serves-search">
                        <i className="fa fa-users icon"></i>
                        {props.item.serves}</div>
                </div>
                <div className="share">
                <i className="fa fa-share icon-share"></i>share</div>
            </div>
        </Link>
    )
}

export default RecipePreview