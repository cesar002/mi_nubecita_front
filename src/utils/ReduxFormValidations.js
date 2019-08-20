import ValidadorService from '../services/ValidatorService'

export const loginValidador = values =>{
        const errors = {};

        if(!values.email){
            errors.email = 'Falta correo electrónico';
        } else if(!ValidadorService.validarEmail(values.email)){
            errors.email = 'Correo electrónico invalido';
        }
    

    
        if(!values.password){
            errors.password = 'Falta la contraseña';
        }

        return errors;
}

export const registroValidador = values =>{
    const errors = {};

    
    if(!values.email){
        errors.email = 'Falta correo electrónico';
    }else if(!ValidadorService.validarEmail(values.email)){
        errors.email = 'Correo electrónico invalido';
    }

    if(!values.password){
        errors.password = 'Falta la contraseña';
    }

    if(!values.rePassword){
        errors.rePassword = 'Confirme su contraseña'
    }else if(values.rePassword !== values.password){
        errors.rePassword = 'Las contraseñas no coinciden'
    }

    return errors
}