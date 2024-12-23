// WIFI - API

import { IWifiConfig, IWifiResponse, IScanResult } from "@/interfaces/wifi";
import axiosServices from "@/utils/axios";

// funcion que trae las configuraciones del wifi
export const getWifiConfig = async (): Promise<IWifiResponse> => {
    const resp = await axiosServices.get(`connections/wifi`);
    return resp.data;
    // la data seria como el siguiente ejemplo
    /**
    {
  "serial": "ESP32-S3E127843CA0B8",
  "device": "ESP32-S3",
  "rssiStatus": -62,
  "wifiQuality": 76,
  "wifiStatus": true,
  "mqttStatus": true,
  "wifi": {
    "wifi_mode": true,
    "wifi_ssid": "INFINITUMD378",
    "wifi_password": "",
    "wifi_ssid2": "INFINITUM3213",
    "wifi_password2": "",
    "wifi_ip_static": false,
    "wifi_ipv4": "10.4.30.15",
    "wifi_gateway": "10.4.30.254",
    "wifi_subnet": "255.255.255.0",
    "wifi_dns_primary": "10.192.10.1",
    "wifi_dns_secondary": "10.106.10.2",
    "ap_ssid": "ESP32-S3E127843CA0B8",
    "ap_password": "",
    "ap_channel": 9,
    "ap_oculto": false,
    "ap_connect": 3
  },
  "code": 1
}
     */
}

// almacenar los datos en el esp32
export const postWifiConfig = async (data: IWifiConfig | null): Promise<{save: boolean}> => {
  const resp = await axiosServices.post(`connections/wifi`, data);
  return resp.data;
}

//buscar redes wifi (scanning) IScanResult se importa
export const scanWifiNetworks = async (): Promise<IScanResult> => {
  const resp = await axiosServices.get('connections/wifi-scan');
  return resp.data;
}