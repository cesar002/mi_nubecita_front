import {SET_MENU_ACTIVE} from '../actions/menuActions'

const initialState = {

}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_MENU_ACTIVE:
            return{
                ...state
            }
        default:
            return state;
    }
}