import _ from 'lodash';

import {
    SET_FILES_USER, SET_FAVORITE_FILES_USER, SET_RECENT_FILES,
    ADD_FAVORITE_FILE, ADD_FILE,
    REMOVE_FAVORITE_FILE, REMOVE_FILES, DELETE_INFO,
    ORDER_FILES_BY_NAME, ORDER_FILES_BY_DATE, ORDER_FILES_BY_SIZE, ORDER_FILES_BY_TYPE,
    ADD_FILES_TEMP, REMOVE_FILES_TEMP, CLEAR_FILES_TEMP,
    TOGGLE_SELECT_STATUS_FILE,
} from '../actions/userDataFilesActions.js'

const initialState = {
    files: [],
    filesSelected: [],
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
        case REMOVE_FILES:
            return{
                ...state,
                files: _.differenceBy(state.files, state.filesSelected, 'idArchivo'),
                deleteFiles: _.concat(state.deleteFiles, state.filesSelected),
            }
        case REMOVE_FAVORITE_FILE:
            return{
                
            }
        case ADD_FILES_TEMP:
            return{
                ...state,
                filesSelected: [...state.filesSelected, action.payload.file]
            }
        case REMOVE_FILES_TEMP:
            return{
                ...state,
                filesSelected: _.filter(state.filesSelected, (f)=> f.idArchivo !== action.payload.idFile)
            }
        case CLEAR_FILES_TEMP:
            return{
                ...state,
                filesSelected: []
            }
        case TOGGLE_SELECT_STATUS_FILE:
            return{
                ...state,
                files: state.files.map( f => f.idArchivo === action.payload.fileStatus.idFile? {...f, selected: action.payload.fileStatus.selected} : {...f} )
            }
        case ORDER_FILES_BY_NAME:
            return{
                ...state,
                files: _.sortBy(state.files, [f => f.nombre])
            }
        case ORDER_FILES_BY_DATE:
            return{
                ...state,
                files: _.sortBy(state.files, [f=>f.fechaSubida])
            }
        case ORDER_FILES_BY_SIZE:
            return{
                ...state,
                files: _.sortBy(state.files, [f => f.size])
            }
        case ORDER_FILES_BY_TYPE:
            return{
                ...state,
                files: _.sortBy(state.files, [f => f.tipo])
            }
        case DELETE_INFO:
            return initialState
        default: return state;
    }
}