import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'remote-redux-devtools'
import thunk from 'redux-thunk'

import state from './state'

const composeEnhancers = composeWithDevTools({
    realtime: true,
    hostname: 'localhost',
    port: 3000
  })


const configureStore = function(){
    let store = createStore(state, composeEnhancers(
        applyMiddleware(thunk)
    ));
    return store
}

export default configureStore;