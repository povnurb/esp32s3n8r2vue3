
//import { IApiIndexResponse } from "@/interfaces";
import { IApiIndexResponseWs } from "@/interfaces"; //TODO: modificar despues
import { getBaseUrlWebsockets } from "@/utils/utils";
import { defineStore } from "pinia";

const wsURL = getBaseUrlWebsockets();
let ws: WebSocket; //: es definicion de tipo
let tt = 0; //para calcular el tiempo para le reconexion

export const useWebsocketsStore = defineStore("websocket",{
    state: () => ({
        message: {
            wifi: {
                wifi_status: false,
                wifi_ssid: "",
                wifi_ipv4: "",
                wifi_mac: ""
            },
            mqtt: {
                mqtt_status: false,
                mqtt_server: "",
                mqtt_user: "",
                mqtt_id: ""
            },
            info: {
                device_fecha: "",
                device_serial: "",
                sala: "",
                device_name: "",
                device_id: "",
                device_mdns: "",
                device_firmware: "",
                device_hardware: "",
                device_manufacture: "",
                device_frequency: 0,
                device_ram: 0,
                device_spiffs: 0,
                device_flash: 0,
                device_time: "",
                device_restart: 0,
                spiffs_used: 0,
                spiffs_total: 0,
                ram_available: 0,
                ram_total: 0,
                wifi_rssi: 0,
                wifi_quality: 0,
                tempEvaporador: 0,
                tempCondensador: 0,
                tempLm35: 0,
                tcdht22: 0,
                humdht22: 0,
                tmin: 0,
                tmax: 0,
                buzzer_status: false
            },
            alarmas: [],
            outputs: [],
            tdht22: {
                cT0: 0,
                cT1: 0,
                cT2: 0,
                cT3: 0,
                cT4: 0,
                cT5: 0,
                cT6: 0,
                cT7: 0,
                cT8: 0,
                cT9: 0,
                cT10: 0,
                cT11: 0,
                cT12: 0,
                cT13: 0,
                cT14: 0,
                cT15: 0,
                cT16: 0,
                cT17: 0,
                cT18: 0,
                cT19: 0,
                cT20: 0,
                cT21: 0,
                cT22: 0,
                //cT23: 0
            },
            hdht22: {
                cH0: 0,
                cH1: 0,
                cH2: 0,
                cH3: 0,
                cH4: 0,
                cH5: 0,
                cH6: 0,
                cH7: 0,
                cH8: 0,
                cH9: 0,
                cH10: 0,
                cH11: 0,
                cH12: 0,
                cH13: 0,
                cH14: 0,
                cH15: 0,
                cH16: 0,
                cH17: 0,
                cH18: 0,
                cH19: 0,
                cH20: 0,
                cH21: 0,
                cH22: 0,
                //cH23: 0
            },
            tEva: {
                tE0: 0,
                tE1: 0,
                tE2: 0,
                tE3: 0,
                tE4: 0,
                tE5: 0,
                tE6: 0,
                tE7: 0,
                tE8: 0,
                tE9: 0,
                tE10: 0,
                tE11: 0,
                tE12: 0,
                tE13: 0,
                tE14: 0,
                tE15: 0,
                tE16: 0,
                tE17: 0,
                tE18: 0,
                tE19: 0,
                tE20: 0,
                tE21: 0,
                tE22: 0,
                //tE23: 0
            },
            tCond: {
                tC0: 0,
                tC1: 0,
                tC2: 0,
                tC3: 0,
                tC4: 0,
                tC5: 0,
                tC6: 0,
                tC7: 0,
                tC8: 0,
                tC9: 0,
                tC10: 0,
                tC11: 0,
                tC12: 0,
                tC13: 0,
                tC14: 0,
                tC15: 0,
                tC16: 0,
                tC17: 0,
                tC18: 0,
                tC19: 0,
                tC20: 0,
                tC21: 0,
                tC22: 0,
                //tC23: 0
            },
            timeM: {
                tm0: 0,
                tm1: 0,
                tm2: 0,
                tm3: 0,
                tm4: 0,
                tm5: 0,
                tm6: 0,
                tm7: 0,
                tm8: 0,
                tm9: 0,
                tm10: 0,
                tm11: 0,
                tm12: 0,
                tm13: 0,
                tm14: 0,
                tm15: 0,
                tm16: 0,
                tm17: 0,
                tm18: 0,
                tm19: 0,
                tm20: 0,
                tm21: 0,
                tm22: 0,
                //tm23: 0
            },
        } as IApiIndexResponseWs, //TODO: modificar el tipo a IApiIndexResponseWs
        flashFirmware: 0 as number,
        clientConnection: false
    }),
    persist: true, //para que este almacenado
    actions: {
        async connectToServer() {
            try {
                ws = new WebSocket(wsURL, ['arduino']);
                this.initWebSocket();
            } catch (error) {
                this.reconnect();
            }
        },
        reconnect() {
            if (this.clientConnection) {
                return;
            }
            this.clientConnection = true;
            tt && window.clearTimeout(tt);//limpiandoel tiempo
            tt = window.setTimeout(() => {
                this.connectToServer();
                this.clientConnection = false;
            }, 5000);
        },
        initWebSocket() {
            //cuando se cierra
            ws.onclose = () => {
                console.log('WS-Close');
                this.reconnect();//reconectamos
            };
            ws.onerror = (error) => {
                //muestra en consola el error
                console.error('WS-Error', error);
                this.reconnect();//reconectamos
            };
            ws.onopen = () => {
                // indica cuando esta conectado
                console.log('WS-Open');
            };
            ws.onmessage = (event) => {
                const data = JSON.parse(event.data); //convertir el objeto en texto
                //console.log(data);//TODO: para verificar luego quitar
                if ('ClientID' in data) {
                    console.log(data);
                } else if ('type' in data) {
                    this.flashFirmware = parseInt(data.msg);//se parsea a un entero
                } else {
                    this.message = data;
                }
            }
        }
    }
});