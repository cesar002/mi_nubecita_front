import {OPEN_MODAL, CLOSE_MODAL, ADD_MODAL_CONTENT, CLEAN_MODAL_CONTENT} from '../actions/SimpleModalActions'

const initialState = {
    isOpen: false,
    iconName: '',
    titulo: '',
    texto: '',
    buttonColor: ''

}

export default (state = initialState, action) => {
    switch(action.type){
        case OPEN_MODAL:
            return{
                ...state,
                isOpen: true
            }
        case CLOSE_MODAL:
            return{
                ...state,
                isOpen: false,
            }
        case ADD_MODAL_CONTENT:
            return{
                ...state,
                iconName: action.payload.modalContent.iconName,
                titulo: action.payload.modalContent.titulo,
                texto: action.payload.modalContent.texto,
                buttonColor: action.payload.modalContent.buttonColor
            }
        case CLEAN_MODAL_CONTENT:
            return initialState
        default: return state
    }
}