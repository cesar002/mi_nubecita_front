import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

import MenuReducers from './reducers/menuReducer'
import EmailUserReducers from './reducers/emailUserReducer';
import LogoutReducers from './reducers/logoutReducers'

export default combineReducers({
    menuData: MenuReducers,
    emailUser: EmailUserReducers,
    logout: LogoutReducers,
    form: formReducer,
})