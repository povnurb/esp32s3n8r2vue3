import { IErrorResponse } from "@/interfaces/common";

const defaultWebpackPorts =[8080,8081];

export const getBaseUrl = () => {
    const { hostname,port,protocol } = window.location;
    const serverUrl = port && defaultWebpackPorts.includes(Number(port)) 
    ? `${protocol}//192.168.1.67` //desarrollo en local 229 o 68 trabajo y 72 hogar
    : `${protocol}//${hostname}`;//para produccion esp32
    return `${serverUrl}/api/`; // indica que es un http://192.168.1.72/api/
}

// validar los mensajes de error
export const isErrorResponse =(error: unknown): error is IErrorResponse=>(
    typeof error === 'object' && error !== null && 'response' in error
);

//retorna el url del ws
export const getBaseUrlWebsockets =(): string =>{
    const { hostname,port} = window.location;
    const serverUrl = port && defaultWebpackPorts.includes(Number(port)) 
    ? `ws://192.168.1.67/ws` //desarrollo en local 229 o 68 trabajo y 72 hogar
    : `ws://${hostname}/ws`;//para produccion esp32
    return `${serverUrl}`; // indica que es un ws://192.168.1.72/ws
}