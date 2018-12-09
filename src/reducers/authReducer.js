const INITIAL_STATE = {
    isSingedIn: null
}

export default ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return { ...state, isSingedIn: true };
        case 'SIGN_OUT':
            return { ...state, isSingedIn: false };
        default:
            return state;
    }
}