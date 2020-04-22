import React, { Component } from 'react'
import './signin.css'
import { connect } from 'react-redux'
import { onShowModal, onSignOut} from '../actions'

class SignIn extends Component {

    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this)
    }

    signOut() {
        fetch('/logout', {
            method: 'GET',
            mode: 'no-cors'
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors != undefined) {
                alert(res.errors)
            } else if (res.err != undefined) {
                alert(res.err)
            } else {
                this.props.onSignOut();
                alert('Logged out successfully !!!')
            }
        })
    }

    render() {
        
        return (
            this.props.isSignIn === false ? (
                <div className="sign-in" onClick={() => this.props.onShowModal()}>
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                </div>
            ) : (
                <div className="sign-out" onClick={() => this.signOut()}>
                    <b>{`Hi, ${this.props.user.username === 'c0n3a0m3n1h9i6e7n' ? 'Admin' : this.props.user.username}`}</b>
                    <i className="fa fa-sign-out sign-out-icon" aria-hidden="true"></i>
                </div>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowModal: () => {dispatch(onShowModal())},
        onSignOut: () => {dispatch(onSignOut())}
      }
    }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)