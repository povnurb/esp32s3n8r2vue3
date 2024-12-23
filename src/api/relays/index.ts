import { IRelaysConfig1, IRelaysResponse1, IRelaysConfig2, IRelaysResponse2 } from "@/interfaces/relays";
import axiosServices from "@/utils/axios";

// traernos la información de los Relay1
export const getRelaysConfig1 = async (): Promise<IRelaysResponse1> =>{
    const resp = await axiosServices.get(`device/relay1`);
    return resp.data;
    // la data seria como el siguiente ejemplo
    /**
    {
	"rssiStatus": -40,
	"wifiQuality": 100,
	"wifiStatus": true,
	"mqttStatus": true,
	"RELAY1": {
		"STATUS1": false,
		"DOMINGO1A": false,
		"LUNES1A": false,
		"MARTES1A": false,
		"MIERCOLES1A": false,
		"JUEVES1A": false,
		"VIERNES1A": false,
		"SABADO1A": false,
		"DOMINGO1B": false,
		"LUNES1B": false,
		"MARTES1B": false,
		"MIERCOLES1B": false,
		"JUEVES1B": false,
		"VIERNES1B": false,
		"SABADO1B": false,
		"R_NAME1": "RELAY1 GPIO17",
		"R_DESCRIPTION1": "Control del GPIO17",
		"R_TIMERON1": false,
		"R_TIMER1": 0,
		"TEMPORIZADOR1": false,
		"TIMEONRELAY1A": "00:00",
		"TIMEOFFRELAY1A": "00:00",
		"TIMEONRELAY1B": "00:00",
		"TIMEOFFRELAY1B": "00:00",
		"FECHAON1": "",
		"FECHAOFF1": "",
		"PROGRAMADO1": false,
		
	},
	"code": 1
}
    */
}

// traernos la información de los Relay1
export const getRelaysConfig2 = async (): Promise<IRelaysResponse2> =>{
    const resp = await axiosServices.get(`device/relay2`);
    return resp.data;
    // la data seria como el siguiente ejemplo
    /**
    {
	"rssiStatus": -40,
	"wifiQuality": 100,
	"wifiStatus": true,
	"mqttStatus": true,
	"RELAY2": {
		"STATUS2": false,
		"DOMINGO2A": false,
		"LUNES2A": false,
		"MARTES2A": false,
		"MIERCOLES2A": false,
		"JUEVES2A": false,
		"VIERNES2A": false,
		"SABADO2A": false,
		"DOMINGO2B": false,
		"LUNES2B": false,
		"MARTES2B": false,
		"MIERCOLES2B": false,
		"JUEVES2B": false,
		"VIERNES2B": false,
		"SABADO2B": false,
		"R_NAME2": "RELAY2 GPIO18",
		"R_DESCRIPTION2": "control del GPIO18",
		"R_TIMERON2": false,
		"R_TIMER2": 0,
		"TEMPORIZADOR2": false,
		"TIMEONRELAY2A": "00:00",
		"TIMEOFFRELAY2A": "00:00",
		"TIMEONRELAY2B": "00:00",
		"TIMEOFFRELAY2B": "00:00",
		"FECHAON2": "",
		"FECHAOFF2": "",
		"PROGRAMADO2": false
	},
	"code": 1
}
    */
}

//TODO: modificar la siguiente funcion
//funcion para salvar la información del mqtt
export const postRelaysConfig1 = async (data: IRelaysConfig1 | null): Promise<{save: boolean}> => { 
    const resp = await axiosServices.post('device/relay1',data);
    return resp.data;
};

export const postRelaysConfig2 = async (data: IRelaysConfig2 | null): Promise<{save: boolean}> => { 
    const resp = await axiosServices.post('device/relay2',data);
    return resp.data;
};