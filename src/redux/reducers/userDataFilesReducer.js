import {
    SET_FILES_USER, SET_FAVORITE_FILES_USER, SET_RECENT_FILES,
    ADD_FAVORITE_FILE, ADD_FILE,
    REMOVE_FAVORITE_FILE, REMOVE_FILE
} from '../actions/userDataFilesActions.js'

const initialState = {
    files: [],
    favoriteFiles: [],
    recentFiles: [],
    pictures: [],
    deleteFiles: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_FILES_USER:
            return{
                ...state,
                files: action.payload.files
            }
        case SET_FAVORITE_FILES_USER:
            return{

            }
        case SET_RECENT_FILES:
            return{

            }
        case ADD_FILE:
            return{

            }
        case ADD_FAVORITE_FILE:
            return{

            }
        case REMOVE_FILE:
            return{

            }
        case REMOVE_FAVORITE_FILE:{

        }
        default: return state;
    }
}