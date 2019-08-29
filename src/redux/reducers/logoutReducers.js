import {LOGOUT_REQUEST_ACTIVE} from '../actions/logoutActions';

export default (state = {logoutActive: false}, action) =>{
    switch(action.type){
        case LOGOUT_REQUEST_ACTIVE:
            return{
                ...state,
                logoutActive: action.payload.activeRequest,
            }
        default: return state
    }
}