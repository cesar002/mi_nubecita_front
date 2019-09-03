import _ from 'lodash';

import {
    SET_FILES_USER, SET_FAVORITE_FILES_USER, SET_RECENT_FILES,
    ADD_FAVORITE_FILE, ADD_FILE,
    REMOVE_FAVORITE_FILE, REMOVE_FILE, DELETE_INFO
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
                ...state,
                files: _.concat(state.files, action.payload.file)
            }
        case ADD_FAVORITE_FILE:
            return{

            }
        case REMOVE_FILE:
            return{

            }
        case REMOVE_FAVORITE_FILE:
            return{

            }
        case DELETE_INFO:
            return initialState
        default: return state;
    }
}