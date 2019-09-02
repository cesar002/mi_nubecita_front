import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

import MenuReducers from './reducers/menuReducer'
import UserDataReducers from './reducers/userDataReducer';
import UserFilesReducers from './reducers/userDataFilesReducer'
import LogoutReducers from './reducers/logoutReducers'

export default combineReducers({
    menuData: MenuReducers,
    userData: UserDataReducers,
    logout: LogoutReducers,
    userFiles: UserFilesReducers,
    form: formReducer,
})