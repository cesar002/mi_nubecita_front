export const ADD_UPLOAD_PROGRESS = 'ADD_UPLOAD_PROGRESS';
export const RESET_UPLOAD_PROGRESS = 'RESET_UPLOAD_PROGRESS';

export const addUploadProgress = (uploadProgress) =>{
    return{
        type: ADD_UPLOAD_PROGRESS,
        payload: {uploadProgress}
    }
}

export const resetUploadProgress = () =>{
    return{
        type: RESET_UPLOAD_PROGRESS,
    }
}