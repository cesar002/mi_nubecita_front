import {EMAIL_EXPRESSION} from '../utils/RegExpresions'

const ValidatorService = (()=>{
    return{
        validarEmail,
    }

    function validarEmail(email){
        let regex = new RegExp(EMAIL_EXPRESSION);

        return regex.test(email)
    }


})()

export default ValidatorService;