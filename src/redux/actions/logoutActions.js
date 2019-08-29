export const LOGOUT_REQUEST_ACTIVE = 'LOGOUT_REQUEST_ACTIVE';

export const logoutRequestActive = (activeRequest) =>{
    return{
        type: LOGOUT_REQUEST_ACTIVE,
        payload: {activeRequest}
    }
}   

