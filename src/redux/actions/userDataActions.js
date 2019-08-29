export const SET_FILES_USER = 'SET_FILES_USER'
export const SET_FAVORITE_FILES_USER = 'SET_FAVORITE_FILES_USER'
export const SET_RECENT_FILES = 'SET_RECENT_FILE'
export const ADD_FILE = 'ADD_FILE';
export const ADD_FAVORITE_FILE = 'ADD_FAVORITE_FILE';
export const REMOVE_FILE = 'REMOVE_FILE'
export const REMOVE_FAVORITE_FILE = 'REMOVE_FAVORITE_FILE'

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

export const removeFile = (idFile) =>{
    return {
        type: REMOVE_FILE,
        payload: { idFile }
    }
}

export const removeFavoriteFile = (idFile) =>{
    return {
        type: REMOVE_FILE_FAVORITE,
        payload: { idFile } 
    }
}