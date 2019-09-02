
import {ACTIVE_MENU_ELEMENT} from '../actions/menuActions'

const initialState =  [
        { idMenu: 1, name: 'Archivos', active: true, route: '/mi_nube', icon: 'folder' },
        { idMenu: 2, name: 'Favoritos', active: false, route: '/mi_nube/favoritos', icon: 'star' },
        { idMenu: 3, name: 'Recientes', active: false, route: '/mi_nube/recientes', icon: 'time' },
        { idMenu: 4, name: 'Fotos', active: false, route: '/mi_nube/fotos', icon: 'picture' },
        { idMenu: 5, name: 'Papelera', active: false, route: '/mi_nube/papelera', icon: 'trash alternate' },
]


export default (state = initialState, action) => {
    switch(action.type){
        case ACTIVE_MENU_ELEMENT:
            return{
                ...state,
                menuData: state.menuData.map( menuItem => menuItem.idMenu === action.payload.idMenu? {...menuItem, active: true} : {...menuItem, active: false} )
            }
        default:
            return state;
    }
}