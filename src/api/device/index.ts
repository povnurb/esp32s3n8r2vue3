import axiosServices from "@/utils/axios"
import { isErrorResponse } from '@/utils/utils';
import { IPasswordForm } from '@/interfaces/user';
import { IApiIndexResponse, IApiIndexResponseWs, IControl, IControlResponse } from "@/interfaces";

//reiniciar el dispositivo
export const postDeviceRestart = async ():Promise<{restart: boolean}> =>{
    const resp = await axiosServices.post('device/restart',{});
    return resp.data;
}

//restaurar el dispositivo a fabrica
export const postDeviceRestore = async ():Promise<{restore: boolean}> =>{
    const resp = await axiosServices.post('device/restore',{});
    return resp.data;
}

//traer el archivo de configuraciones

export const getDeviceSettings = async ()=>{
    const resp = await axiosServices.get('device/settings-download',{responseType: 'blob'});
    return resp.data;
}
//traer el archivo de Alarmas

export const getDeviceAlarms = async ()=>{
    const resp = await axiosServices.get('device/alarmas-download',{responseType: 'blob'});
    return resp.data;
}

//subir el archivo de configuraciones
export const uploadDeviceSettings = async (file:File): Promise<{save: boolean,msg?:string}>=>{
    const formData = new FormData();
    formData.append('file', file);
    try{
        const resp = await axiosServices.post('device/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            return resp.data;
    }catch(error: unknown){
        if(isErrorResponse(error)){
        const errorData = error.response?.data;
        if(errorData && 'save' in errorData && 'msg' in errorData) {
            return errorData;
        }
    }
    throw new Error('Error al cargar el archivo de configuración');
}}

// actualizar el firmware
export const uploadDeviceFirmware = async (file: File): Promise<{ save: boolean, msg?: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const resp = await axiosServices.post('device/settings-firmware', formData, {
            headers: { 'Content-Type': 'application/octet-stream' },
        });
        return resp.data;
    } catch (error: unknown) {
        // Asegúrate de que error es un objeto
        if (isErrorResponse(error)) {
            const errorData = error.response?.data;
            if (errorData && 'save' in errorData && 'msg' in errorData) {
                return errorData;
            }
        }
        throw new Error('Error al cargar el firmware al dispositivo');
    }
}

// actualizar la contraseña
export const postUpdatePassword = async (data: IPasswordForm): Promise<{ save: boolean, msg?: string }> => {
    try {
        const resp = await axiosServices.post('device/user', data);
        return resp.data;
    } catch (error: unknown) {
        // Asegúrate de que error es un objeto
        if (isErrorResponse(error)) {
            const errorData = error.response?.data;
            if (errorData && 'save' in errorData && 'msg' in errorData) {
                return errorData;
            }
        }
        throw new Error('Error al actualizar la contraseña');
    }
}

// cerrar sesion

export const postUserSession = async (): Promise<{ session: boolean, msg?: string }> => {
    try {
        const resp = await axiosServices.post('device/logout');
        return resp.data;
    } catch (error: unknown) {
        // Asegúrate de que error es un objeto
        if (isErrorResponse(error)) {
            const errorData = error.response?.data;
            if (errorData && 'session' in errorData && 'msg' in errorData) {
                return { session: false, msg: 'Sesion cerrada correctamente' };
                //return errorData;
            }
        }
        throw new Error('Error al cerrar sesion');
    }
}

// control de los rele y dimmer
export const postControl = async (data: IControl): Promise<IControlResponse> => {
    const resp = await axiosServices.post('device/control', data);
    return resp.data;
}

// traer informacion del Index TODO: hace uno parecido para el time 
// y el nombre de la sala
export const getIndex = async ():Promise<IApiIndexResponse>=>{
    const resp = await axiosServices.get('index');
    return resp.data;
}

// traer informacion del Index TODO: hace uno parecido para el time 
// y el nombre de la sala
export const getIndexWs = async ():Promise<IApiIndexResponseWs>=>{
    const resp = await axiosServices.get('indexws');
    return resp.data;
}