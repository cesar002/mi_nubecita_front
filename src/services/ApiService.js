import axios from 'axios';
import store from '../redux/index'
import * as uploadActions from '../redux/actions/uploadProgressAction'

import {
    REGISTRARSE, LOGIN, 
    VERIFICAR_CORREO, GET_ME_EMAIL, LOGOUT, 
    UPLOAD_FILES, FILES
} from '../utils/ApiDirections'

import LocalStorageService from './LocalStorageService'

export default (function(){
    return{
        registrarse,
        login,
        logout,
        verificarCuenta,
        getMe,
        uploadFiles,
        getFiles,
    }

    function registrarse(data){
        return new Promise((resolve, reject) =>{
            axios.post(REGISTRARSE, data)
            .then(response =>{
                resolve(response.data);
            })
            .catch(err => {
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error: err
                });
            })
        });
    }

    function login(data){
        return new Promise((resolve, reject)=>{
            axios.post(LOGIN, data)
            .then(response =>{
                    resolve(response.data);
            })
            .catch(error => {
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error
                })
            })
        });
    }

    function logout(){
        return new Promise((resolve, reject) =>{
            axios.post(LOGOUT,{},{
                headers:{
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`
                }
            })
            .then(response =>{
                resolve(response.data)
            })
            .catch(error =>{
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error
                })
            })
        })
    }

    function verificarCuenta(code){
        return new Promise((resolve, reject) => {
            axios.get(`${VERIFICAR_CORREO}/${code}`)
            .then(response =>{
                resolve(response.data);
            })
            .catch(error => {
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error
                })
            })
        })
    }

    function getMe(){
        return new Promise((resolve, reject) =>{
            axios.get(GET_ME_EMAIL,{
                headers:{
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`
                }
            })
            .then(response =>{
                resolve(response.data)
            })
            .catch(error => {
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error
                })
            })
        });
    }

    function uploadFiles(files){
        return new Promise((resolve, reject) => {
            axios.post(UPLOAD_FILES, files, {
                headers:{
                    'content-type': 'multipart/form-data',
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`,
                },
                onUploadProgress: progressEvent => {

                    let porcentaje = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    store.dispatch(uploadActions.addUploadProgress({
                        inProgress: porcentaje,
                    }))
                }
            })
            .then(response =>{
                resolve(response.data)
            })
            .catch(error =>{
                reject({
                    status: -1,
                    mensaje: "Error desconocido, intente mas tarde",
                    error,
                })
            })
        });
    }

    function getFiles(){
        return new Promise((resolve, reject) =>{
            axios.get(FILES, {
                headers:{
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`,
                }
            })
            .then(response =>{
                resolve(response.data)
            })
            .catch(error =>{
                resolve(error)
            })
        })
    }

})()