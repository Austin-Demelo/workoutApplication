const firebase = require("firebase");
require("firebase/firestore");

const UserActions = {
    LOGIN_USER: 'user/LOGIN_USER',
    REGISTER_USER: 'user/REGISTER_USER',
    USER_ERROR: 'user/USER_ERROR',
    LOGIN_MODAL: 'user/LOGIN_MODAL',
    SIGNOUT_USER: 'user/SIGNOUT_USER'
}


//User Interface
//username: Unique. Used for indexing
//email: Used to log into Firebase



//Log in user, and store result in store
export function loginUser(email, password) {
    return ((dispatch, getState) => {

        var auth = firebase.auth();
        return auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
            dispatch ({ type: UserActions.LOGIN_USER, payload: result.user.email });
            //console.log(result.user.email)
            return result.user.email;
        })
        .catch((error) => {
            dispatch ( { type: UserActions.USER_ERROR, payload: {hasError: true, message: error.message}} );
            return error;
        });
    });
}

//Register user, and store result in store
export function registerUser(email, password) {
    return ((dispatch, getState) => {

        var auth = firebase.auth();
        return auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
            dispatch ({ type: UserActions.REGISTER_USER, payload: result.user.email });
            return result.user.email;
        })
        .catch((error) => {
            dispatch ( { type: UserActions.USER_ERROR, payload: {hasError: true, message: error.message}} );
            return error;
        });
    });
}

export function signOut() {
    return ((dispatch, getState) => {
        var auth = firebase.auth();
        return auth.signOut()
        .then((result) => {
            if (!auth.currentUser) {
                dispatch ({ type: UserActions.SIGNOUT_USER });
                return true;
            }
        })
        .catch((error) => {
            
            dispatch ( { type: UserActions.USER_ERROR, payload: {hasError: true, message: error.message}} );
            return error;
        });
    });
}

const initialState = {
    user: undefined, //The login email
    loggedIn: false,
    hasError: false,
    message: "",
}

export function userReducer(state = initialState, action) {
    switch(action.type) {
        case UserActions.LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
                hasError: false,
                message: "",
            }; 
        case UserActions.SIGNOUT_USER:
            return {
                ...state,
                user: undefined,
                loggedIn: false,
                hasError: false,
                message: "",
            }; 
        case UserActions.REGISTER_USER:
            console.log("Registered");
            return {
                ...state,
                user: action.payload,
                isLoginModalVisible: false,
                loggedIn: true,
                hasError: false,
                message: "",
            } ;
        case UserActions.USER_ERROR:    
            console.log("Error");
            return {
                ...state,
                hasError: true,
                message: action.payload.message,
                
            }; 
        default: 
            return state;
     }
}

export {
    initialState as InitialUserState,
    UserActions};