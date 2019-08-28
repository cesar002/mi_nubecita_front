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

    if(!values.password_confirmation){
        errors.password_confirmation = 'Confirme su contraseña'
    }else if(values.password_confirmation !== values.password){
        errors.password_confirmation = 'Las contraseñas no coinciden'
    }

    return errors
}