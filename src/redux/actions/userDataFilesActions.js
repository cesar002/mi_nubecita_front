export const SET_FILES_USER = 'SET_FILES_USER'
export const SET_FAVORITE_FILES_USER = 'SET_FAVORITE_FILES_USER'
export const SET_RECENT_FILES = 'SET_RECENT_FILE'
export const ADD_FILE = 'ADD_FILE';
export const ADD_FAVORITE_FILE = 'ADD_FAVORITE_FILE';
export const ADD_FILES_TEMP = 'ADD_FILES_TEMP'
export const REMOVE_FILES_TEMP = 'REMOVE_FILES_TEMP'
export const CLEAR_FILES_TEMP = 'CLEAR_FILES_TEMP'
export const REMOVE_FILES = 'REMOVE_FILES'
export const REMOVE_FAVORITE_FILE = 'REMOVE_FAVORITE_FILE'
export const DELETE_INFO = 'DELETE_INFO'
export const ORDER_FILES_BY_NAME  = 'ORDER_FILES_BY_NAME'
export const ORDER_FILES_BY_DATE = 'ORDER_FILES_BY_DATE'
export const ORDER_FILES_BY_TYPE = 'ORDER_FILES_BY_TYPE'
export const ORDER_FILES_BY_SIZE = 'ORDER_FILES_BY_SIZE'
export const TOGGLE_SELECT_STATUS_FILE =  'TOGGLE_SELECT_STATUS_FILE'

export const setFilesUser = (files) =>{
    return{
        type: SET_FILES_USER,
        payload: { files }
    }
}

export const setFavoriteFilesUser = (favoriteFile) =>{
    return{
        type: SET_FAVORITE_FILES_USER,
        payload: { favoriteFile }
    }
}

export const setRecentFiles = (recentFiles) =>{
    return{
        type: SET_RECENT_FILES,
        payload: { recentFiles }
    }
}

export const addFile = (file) => {
    return {
        type: ADD_FILE,
        payload: { file }
    }
}

export const addFavoriteFile = (file) =>{
    return {
        type: ADD_FAVORITE_FILE,
        payload: { file }
    }
}

export const addFilesTemp = (file) =>{
    return{
        type:ADD_FILES_TEMP,
        payload: {file}
    }
}

export const removeFilesTemp = (idFile) =>{
    return{
        type: REMOVE_FILES_TEMP,
        payload: {idFile}
    }
}

export const clearFilesTemp = () =>{
    return{
        type: CLEAR_FILES_TEMP,
    }
}

export const deleteFiles = () =>{
    return {
        type: REMOVE_FILES,
    }
}

export const removeFavoriteFile = (idFile) =>{
    return {
        type: REMOVE_FAVORITE_FILE,
        payload: { idFile } 
    }
}

export const orderFilesByName = () =>{
    return{
        type: ORDER_FILES_BY_NAME,
    }
}

export const orderFilesByDate = () =>{
    return{
        type: ORDER_FILES_BY_DATE,
    }
}

export const orderFilesBySize = () =>{
    return{
        type: ORDER_FILES_BY_SIZE,
    }
}

export const orderFilesByType = () =>{
    return{
        type: ORDER_FILES_BY_TYPE,
    }
}

export const deleteInfo = () =>{
    return{
        type: DELETE_INFO
    }
}

export const toggleSelectFileStatus = (fileStatus) =>{
    return{
        type: TOGGLE_SELECT_STATUS_FILE,
        payload: {fileStatus},
    }
}