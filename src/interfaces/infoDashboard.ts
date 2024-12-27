
export interface IWifiInfo {
    wifi_status: boolean;
    wifi_ssid: string;
    wifi_ipv4: string;
    wifi_mac: string;
}

export interface IMqttInfo {
    mqtt_status: boolean;
    mqtt_server: string;
    mqtt_user: string;
    mqtt_id: string;
}

export interface IDeviceInfo {
    device_fecha: string; //ok
    device_serial: string;//ok
    sala: string;//ok
    device_name: string;//ok
    device_id: string;//ok
    device_mdns: string;//ok
    device_firmware: string;//ok
    device_hardware: string;//ok
    device_manufacture: string;//ok
    device_frequency: number;//ok
    device_ram: number;//ok
    device_spiffs: number;//ok
    device_flash: number;//ok
    device_time: string;//ok
    device_restart: number;//ok
    spiffs_used: number;//ok
    spiffs_total: number;//ok
    ram_available: number;//ok
    ram_total: number;//ok
    wifi_rssi: number;//ok
    wifi_quality: number;//ok
    tempEvaporador: string;//ok
    tempCondensador: string;//ok
    tempLm35: string;//ok
    tcdht22: string;//ok
    humdht22: string;//ok
    tmin: string;//ok
    tmax: string;//ok
    buzzer_status: boolean;//ok
}

export interface IOutput {
    name: string;
    status: boolean | number; // Puede ser booleano o número (para el dimmer)
}[];

export interface IApiIndexResponse {
    wifi: IWifiInfo;
    mqtt: IMqttInfo;
    info: IDeviceInfo;
    outputs: IOutput[];
}
//funcion generica que controla los relays y el dimmer
export interface IControl {
    protocol: string;
    output: string;
    value: number | boolean | string;
}


export interface IControlResponse {
    status: boolean;
    output: string;
}
//alarmas otras

export interface IAlarmasResp{
	
	//rssiStatus: number;
	//wifiQuality: number;
	//wifiStatus: boolean;
	//mqttStatus: boolean;
	//serial: string;
	//device: string;
	//code: number;
	cantidad: number;
	prueba_de_alarmas: boolean;
	alarmas?: {
		numero?: number;
		name?: string;
		logic?: boolean;
		status?: boolean;
		reconocida?: boolean;
		on?: string;
		off?: string;
		count?: number;
	}[];

  }


//
export interface IAlarmas {
    numero: number;
    name: string;
    logic: boolean;
    status: boolean;
    reconocida: boolean;
    on: string;
    off: string;
    count: number;
}[];
export interface IHistory {

		alarma: string;
		fechas: string;
		status: boolean;
	
}[];

// TODO: implementar
export interface IApiIndexResponseWs {
    wifi: IWifiInfo;
    mqtt: IMqttInfo;
    info: IDeviceInfo;
    alarmas: IAlarmas[];
    outputs: IOutput[];
    tdht22: ITdht22;
    hdht22: IHdht22;
    tEva: ITEva;
    tCond: ITCond;
    timeM: ItimeM;
    //TODO: agregar mas info
}

export interface ITdht22 {
    cT0: number;
    cT1: number;
    cT2: number;
    cT3: number;
    cT4: number;
    cT5: number;
    cT6: number;
    cT7: number;
    cT8: number;
    cT9: number;
    cT10: number;
    cT11: number;
    cT12: number;
    cT13: number;
    cT14: number;
    cT15: number;
    cT16: number;
    cT17: number;
    cT18: number;
    cT19: number;
    cT20: number;
    cT21: number;
    cT22: number;
    //cT23: number;
}

export interface IHdht22 {
    cH0: number;
    cH1: number;
    cH2: number;
    cH3: number;
    cH4: number;
    cH5: number;
    cH6: number;
    cH7: number;
    cH8: number;
    cH9: number;
    cH10: number;
    cH11: number;
    cH12: number;
    cH13: number;
    cH14: number;
    cH15: number;
    cH16: number;
    cH17: number;
    cH18: number;
    cH19: number;
    cH20: number;
    cH21: number;
    cH22: number;
    //cH23: number;
}

export interface ITEva {
    tE0: number;
    tE1: number;
    tE2: number;
    tE3: number;
    tE4: number;
    tE5: number;
    tE6: number;
    tE7: number;
    tE8: number;
    tE9: number;
    tE10: number;
    tE11: number;
    tE12: number;
    tE13: number;
    tE14: number;
    tE15: number;
    tE16: number;
    tE17: number;
    tE18: number;
    tE19: number;
    tE20: number;
    tE21: number;
    tE22: number;
    //tE23: number;
}

export interface ITCond {
    tC0: number;
    tC1: number;
    tC2: number;
    tC3: number;
    tC4: number;
    tC5: number;
    tC6: number;
    tC7: number;
    tC8: number;
    tC9: number;
    tC10: number;
    tC11: number;
    tC12: number;
    tC13: number;
    tC14: number;
    tC15: number;
    tC16: number;
    tC17: number;
    tC18: number;
    tC19: number;
    tC20: number;
    tC21: number;
    tC22: number;
    //tC23: number;
}

export interface ItimeM {
    tm0: number;
    tm1: number;
    tm2: number;
    tm3: number;
    tm4: number;
    tm5: number;
    tm6: number;
    tm7: number;
    tm8: number;
    tm9: number;
    tm10: number;
    tm11: number;
    tm12: number;
    tm13: number;
    tm14: number;
    tm15: number;
    tm16: number;
    tm17: number;
    tm18: number;
    tm19: number;
    tm20: number;
    tm21: number;
    tm22: number;
    //tm23: number;
}