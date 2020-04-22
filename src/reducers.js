const initialState = {
    isShowModal: false,
    isSignIn: false,
    userInfo: null,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_MODAL':
            return Object.assign({}, state, {
                isShowModal: true
            })
        case 'HIDE_MODAL':
            return Object.assign({}, state, {
                isShowModal: false
            })
        case 'SIGN_IN': 
            return Object.assign({}, state, {
                isSignIn: true,
                userInfo: action.payload
            })
        case 'SIGN_OUT':
            return Object.assign({}, state, {
                isSignIn: false,
                userInfo: null
            })
        default:
            return state
    }
}

export default reducers