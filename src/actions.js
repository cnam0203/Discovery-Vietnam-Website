export const onShowModal = () => {
    return {
        type: 'SHOW_MODAL'
    }
}

export const onHideModal = () => {
    return {
        type: 'HIDE_MODAL'
    }
}

export const onSignIn = (user) => {
    console.log(user)
    return {
        type: 'SIGN_IN',
        payload: user
    }
}

export const onSignOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}