import React, { Component } from 'react'
import './signinmodal.css'
import { connect } from 'react-redux'
import { onHideModal, onSignIn } from '../actions'


class SignInModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signUp: true,
            email: '',
            password: '',
            username: '',
        }
        this.signUp = this.signUp.bind(this)
        this.logIn = this.logIn.bind(this)
        this.hideSignInModal = this.hideSignInModal.bind(this)
        this.logInFacebook = this.logInFacebook.bind(this)
        // this.logInGoogle = this.logInGoogle.bind(this)
    }

    logInFacebook() {
        fetch('/auth/facebook', {
            method: 'GET',
            mode: 'no-cors'
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors != undefined) {
                alert(res.errors)
            } else {
                this.setState({signUp: true})
                this.setState({email: ''})
                this.setState({username: ''})
                this.setState({password: ''})
                this.props.onSignIn(res.user)
                this.props.onHideModal()
                alert('Logged in successfully !!!')
            }
        })
    }

    // logInGoogle() {
    //     fetch('/auth/google', {
    //         method: 'GET',
    //         mode: 'no-cors'
    //     })
    //     .then((res) => res.json())
    //     .then((res) => {
    //         if (res.errors != undefined) {
    //             alert(res.errors)
    //         } else {
    //             this.setState({signUp: true})
    //             this.setState({email: ''})
    //             this.setState({username: ''})
    //             this.setState({password: ''})
    //             this.props.onSignIn(res.user)
    //             this.props.onHideModal()
    //             alert('Logged in successfully !!!')
    //         }
    //     })
    // }

    signUp() {
        console.log(this.state.email, this.state.password)
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                email: this.state.email,
                username: this.state.username,
                password: this.state.password
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.validator !== undefined) {
                alert(res.validator[0].msg)
            } else if (res.errors !== undefined) {
                alert(res.errors)
            } else {
                this.setState({signUp: true})
                this.setState({email: ''})
                this.setState({username: ''})
                this.setState({password: ''})
                this.props.onSignIn(res.user)
                this.props.onHideModal()
                alert('Signed Up successfully !!!')
            }
        })
        .catch((err) => console.log(err))
    }

    logIn() {
        console.log(this.state.email, this.state.password)
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.errors !== undefined) {
                alert(res.errors)
            } else if (res.err !== undefined) {
                alert(res.err)
            } else {
                console.log(res.user, 'Log In: ' + res.login)
                this.setState({signUp: true})
                this.setState({email: ''})
                this.setState({username: ''})
                this.setState({password: ''})
                console.log('action', res.user)
                this.props.onSignIn(res.user)
                this.props.onHideModal()
                alert('Logged in successfully')
            }
        })
        .catch((err) => console.log(err))
    }

    hideSignInModal() {
        this.setState({signUp: true})
        this.setState({email: ''})
        this.setState({username: ''})
        this.setState({password: ''})
        this.props.onHideModal()
    }

    render() {
        return this.props.isShowModal === true ? (
            <div id="signin-modal" >
                <div id="modal-content">
                    <i className="fa fa-times" id="remove-modal" onClick={() => this.hideSignInModal()}
                        style={{color: this.state.signUp === true ? 'black' : 'white'}}></i>
                    <div className="sign-div" onClick={() => this.setState({signUp: true})} 
                            style={this.state.signUp === true ? {backgroundColor: '#f59de8', color: 'white', fontWeight: 'bold'} : {backgroundColor: 'white', color: 'black'}}>
                                <i className="fa fa-user-plus" aria-hidden="true"></i></div>
                    <div className="sign-div" onClick={() => this.setState({signUp: false})}
                            style={this.state.signUp === false ? {backgroundColor: '#f59de8', color: 'white', fontWeight: 'bold'} : {backgroundColor: 'white', color: 'black'}}>
                                <i className="fa fa-sign-in" aria-hidden="true"></i></div>
                    <div id="sign-up">
                        <input  autoComplete="off" readOnly 
    onFocus={(e) => e.target.removeAttribute('readonly')}  className="input-sign-in" type="text" value={this.state.email} placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}></input>
                        {
                            this.state.signUp === true ? (
                                <input autoComplete="off" readOnly 
                                onFocus={(e) => e.target.removeAttribute('readonly')} className="input-sign-in" type="text" value={this.state.username} placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}></input>
                            ) : null
                        }
                        <input autoComplete="off" readOnly 
    onFocus={(e) => e.target.removeAttribute('readonly')} className="input-sign-in" type="password" value={this.state.password} placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}></input>
                    </div>
                    {
                        this.state.signUp === true ? (
                            <div onClick={() => this.signUp()} className="input-sign-in btn-sign-in">REGISTER</div>
                        ) : (
                            <div onClick={() => this.logIn()} className="input-sign-in btn-sign-in">LOG IN</div>
                        )
                    }
                    <div onClick={()  => this.logInFacebook()} className="input-sign-in btn-sign-in" style={{backgroundColor: '#3b5998'}}>
                        <i className="fa fa-facebook" aria-hidden="true" style={{marginRight: 10}}></i>FACEBOOK
                    </div>
                    {/* <div onClick={() => this.logInGoogle()} className="input-sign-in btn-sign-in" style={{backgroundColor: 'white', border: '1px solid black', color: 'black'}}>
                        <i className="fa fa-google" aria-hidden="true" style={{marginRight: 10}}></i>GOOGLE</div> */}
                </div>
            </div>
        ) : null
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        onHideModal: () => {dispatch(onHideModal())},
        onSignIn: (user) => {dispatch(onSignIn(user))}
      }
    }

export default connect(null, mapDispatchToProps)(SignInModal)


    