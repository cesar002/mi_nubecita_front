const LocalStorageService = (()=>{
    return {
        setItem,
        getItem,
        existItem,
        removeItem,
        clear,
    }

    function setItem(itemName, item){
        window.localStorage.setItem(itemName, item)
    }

    function getItem(itemName){
        return window.localStorage.getItem(itemName)
    }

    function existItem(itemName){
        return  window.localStorage.getItem(itemName) === null? false : true
    }

    function removeItem(itemName){
        window.localStorage.removeItem(itemName)
    }

    function clear(){
        window.localStorage.clear()
    }

})()

export default LocalStorageService;