import {SET_EMAIL_USER, DELETE_EMAIL_USER} from '../actions/userDataAction';

export default (state ={}, action) => {
    switch(action.type){
        case SET_EMAIL_USER:
            return{
                ...state,
                userData: action.payload.userData
            }
        case DELETE_EMAIL_USER:
            return{
                ...state,
                userData: {}
            }
        default: return state;
    }
}