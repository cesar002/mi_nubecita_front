import {SESSION_NAME} from '../utils/Constants'

const LocalStorageService = (()=>{
    return {
        setItem,
        getItem,
        existItem,
        removeItem,
        clear,
        getSessionToken,
        setSessionToken,
        deleteSessionToken,
        existSessionToken,
    }

    function setItem(itemName, item){
        if(existItem(itemName)){
            return
        }
        window.localStorage.setItem(itemName, item)
    }

    function getItem(itemName){
        return window.localStorage.getItem(itemName)
    }

    function existItem(itemName){
        return  window.localStorage.getItem(itemName) === null? false : true
    }

    function removeItem(itemName){
        if(!existItem(itemName)){
            return
        }
        window.localStorage.removeItem(itemName)
    }

    function clear(){
        window.localStorage.clear()
    }

    function getSessionToken(){
        return existItem(SESSION_NAME)? getItem(SESSION_NAME) : 'xxxxxxxxx';
    }

    function setSessionToken(token){
        setItem(SESSION_NAME, token)
    }

    function deleteSessionToken(){
        removeItem(SESSION_NAME);
    }

    function existSessionToken(){
        return existItem(SESSION_NAME)
    }

})()

export default LocalStorageService;