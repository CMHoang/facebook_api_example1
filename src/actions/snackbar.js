export function openSnackbar(message) {
    return dispatch => {
        dispatch({
            type: "SHOW_SNACKBAR",
            payload: {
                message
            }
        })
    }
}

export function closeSnackbar() {
    return dispatch => {
        dispatch({
            type: "CLOSE_SNACKBAR"
        })
    }
}
