import * as actionTypes from './actiontypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (idToken,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: idToken
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const checkAuthTimeout = (expirationTIme) => {
    return dispatch => {
            setTimeout(() => {
                dispatch(logout());
            },expirationTIme  * 1000)
    };

}

export const logout= () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData= {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-txcz8kYFkjS6t3ZCEdCYfYQWnL4U2qE';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-txcz8kYFkjS6t3ZCEdCYfYQWnL4U2qE';
        }
        axios.post(url, authData)
        .then( response => {
                console.log(response);
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token',response.data.idToken);
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState= () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expiratationDate = new Date(localStorage.getItem('expirationDate')); 
            if(expiratationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId ));
                dispatch(checkAuthTimeout((expiratationDate.getTime() - new Date().getTime())/ 1000));
            }
            else{
                dispatch(logout());
            }
        }
    };
};