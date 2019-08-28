import {SET_EMAIL_USER, DELETE_EMAIL_USER} from '../actions/emailUserAction';

export default (state ={}, action) => {
    switch(action.type){
        case SET_EMAIL_USER:
            return{
                ...state,
                email_user: action.payload.email
            }
        case DELETE_EMAIL_USER:
            return{
                ...state,
                email_user: {}
            }
        default: return state;
    }
}