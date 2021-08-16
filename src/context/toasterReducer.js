
const initialState = {
    toaster: null
}

const toasterReducer = (state = initialState, action) => {
    if(action.type == "SHOW_TOASTER"){
        return {...state, toaster: action.toaster } 
    }

    if(action.type == "HIDE_TOASTER"){
        return {...state, toaster: null } 
    }

    return {...state} 
}

export {toasterReducer, initialState}