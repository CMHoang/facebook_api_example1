const defaultState = {
    open: false,
    message: ""
};

const snackbar = (state=defaultState, action) => {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                ...state,
                open: true,
                message: action.payload.message
            }
        case 'CLOSE_SNACKBAR':
            return {
                ...state,
                open: false,
                message: ""
            }
        default:
            return state
    }
}
export default snackbar
