import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AddRecipeButton = (props) => {
    if (props.user != null) {
        if (props.user.username === 'c0n3a0m3n1h9i6e7n') {
            return (
                <Link to="/cuisine/addrecipe">
                    <i className="fa fa-pencil"  id="add-recipe"style={{position: 'absolute', right: '2%', bottom: '5%'}}><b id="add-recipe-text">Add a recipe</b></i>
                </Link>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userInfo
    }
}

export default connect(mapStateToProps)(AddRecipeButton)