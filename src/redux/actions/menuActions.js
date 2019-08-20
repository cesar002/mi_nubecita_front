export const SET_MENU_ACTIVE = 'SET_MENU_ACTIVE'

export const setMenuActive = (menuActive) => {
    return{
        type: SET_MENU_ACTIVE,
        payload: {menuActive},
    }
}