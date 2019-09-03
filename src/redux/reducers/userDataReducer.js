import {SET_EMAIL_USER, DELETE_EMAIL_USER, SET_EN_USO} from '../actions/userDataAction';

export default (state ={}, action) => {
    switch(action.type){
        case SET_EMAIL_USER:
            return{
                ...state,
                me: action.payload.userData.me,
                enUso: action.payload.userData.enUso,
                limiteAlmacenaje: action.payload.userData.limiteAlmacenaje,
            }
        case DELETE_EMAIL_USER:
            return{
                ...state,
                me: '',
                enUso: undefined,
                limiteAlmacenaje: {}
            }
        case SET_EN_USO:
            return{
                ...state,
                enUso: action.payload.enUso,
            }
        default: return state;
    }
}