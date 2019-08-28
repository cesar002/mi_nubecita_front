export const SET_EMAIL_USER = 'SET_EMAIL_USER';
export const DELETE_EMAIL_USER = 'DELETE_EMAIL_USER';

export const setEmailUser = (email) => {
    return{
        type: SET_EMAIL_USER,
        payload: {email}
    }
}

export const deleteEmailUser = () => {
    return{
        type: DELETE_EMAIL_USER
    }
}