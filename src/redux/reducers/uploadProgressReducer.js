import {ADD_UPLOAD_PROGRESS, RESET_UPLOAD_PROGRESS } from '../actions/uploadProgressAction'

export default (state = {}, action) => {
    switch(action.type){
        case ADD_UPLOAD_PROGRESS:
            return{
                ...state,
                inProgress: action.payload.uploadProgress.inProgress,
            }
        case RESET_UPLOAD_PROGRESS:
            return{
                ...state,
                inProgress: undefined,
            }
        default: return state;
    }
}