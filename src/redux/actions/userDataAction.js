export const SET_EMAIL_USER = 'SET_EMAIL_USER';
export const DELETE_EMAIL_USER = 'DELETE_EMAIL_USER';
export const SET_EN_USO = 'SET_EN_USO'

export const setUserData = (userData) => {
    return{
        type: SET_EMAIL_USER,
        payload: {userData}
    }
}

export const deleteEmailUser = () => {
    return{
        type: DELETE_EMAIL_USER
    }
}

export const setEnUso = (enUso) =>{
    return{
        type: SET_EN_USO,
        payload: {enUso}
    }
}