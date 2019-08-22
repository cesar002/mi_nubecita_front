export const ACTIVE_MENU_ELEMENT = 'ACTIVE_MENU_ELEMENT'

export const activeMenuElement = (idMenu) => {
    return{
        type: ACTIVE_MENU_ELEMENT,
        payload: {idMenu},
    }
}