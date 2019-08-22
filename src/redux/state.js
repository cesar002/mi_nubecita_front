import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form'

import MenuReducers from './reducers/menuReducer'

export default combineReducers({
    menuData: MenuReducers,
    form: formReducer,
})