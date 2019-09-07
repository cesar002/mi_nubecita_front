import axios from 'axios';
import store from '../redux/index'
import * as uploadActions from '../redux/actions/uploadProgressAction'

import {
    REGISTRARSE, LOGIN, 
    VERIFICAR_CORREO, GET_ME_EMAIL, LOGOUT, 
    UPLOAD_FILES, FILES, DELETE_FILES,
    GET_FILES_DELETED,
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
        deleteFiles,
        getDeletedFiles,
    }

    function registrarse(data){
        return new Promise((resolve, reject) =>{
            axios.post(REGISTRARSE, data)
            .then(response =>{
                resolve(response.data);
            })
            .catch(error => {
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
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
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data)
                }
            })
        })
    }

    function deleteFiles(files){
        return new Promise((resolve, reject) => {
            axios.delete(DELETE_FILES, {
                data: files,
                headers:{
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`,
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data);
                }
            })
        });
    }

    function getDeletedFiles(){
        return new Promise((resolve, reject)=>{
            axios.get(GET_FILES_DELETED, {
                headers:{
                    authorization: `Bearer ${LocalStorageService.getSessionToken()}`,
                }
            })
            .then(response =>{
                resolve(response.data);
            })
            .catch(error => {
                if(!error.response){
                    reject({
                        status: -1,
                        mensaje: "Error desconocido, intente mas tarde",
                        error,
                    })
                }else{
                    reject(error.response.data);
                }
            })
        })
    }

})()