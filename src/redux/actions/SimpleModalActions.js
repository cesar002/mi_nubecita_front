export const OPEN_MODAL = 'OPEN_MODAL';
export const ADD_MODAL_CONTENT = 'ADD_MODAL_CONTENT'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const CLEAN_MODAL_CONTENT = 'CLEAN_MODAL_CONTENT'

export const openModal = () =>{
    return{
        type: OPEN_MODAL,
    }
}

export const closeModal = () =>{
    return{
        type: CLOSE_MODAL
    }
}

export const addModalContent = (modalContent) =>{
    return{
        type: ADD_MODAL_CONTENT,
        payload: {modalContent}
    }
}

export const cleanModalContent = () => {
    return{
        type: CLEAN_MODAL_CONTENT
    }
}
