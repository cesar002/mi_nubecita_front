import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

import MenuReducers from './reducers/menuReducer'
import EmailUserReducers from './reducers/emailUserReducer';

export default combineReducers({
    menuData: MenuReducers,
    emailUser: EmailUserReducers,
    form: formReducer,
})