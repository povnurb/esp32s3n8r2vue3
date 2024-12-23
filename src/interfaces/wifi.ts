
export interface IWifiConfig {
    wifi_mode?: boolean;
    wifi_ssid?: string;
    wifi_password?: string;
    wifi_ssid2?: string;
    wifi_password2?: string;
    wifi_ip_static?: boolean;
    wifi_ipv4?: string;
    wifi_subnet?: string;
    wifi_gateway?: string;
    wifi_dns_primary?: string;
    wifi_dns_secondary?: string;
    ap_ssid?: string;
    ap_password?: string;
    ap_visibility?: boolean;
    ap_channel?: number;
    ap_connect?: number;
}

export interface IWifiResponse {
    serial: string;
  device: string;
  rssiStatus: number;
  wifiQuality: number;
  wifiStatus: boolean;
  mqttStatus: boolean;
  wifi: IWifiConfig;
  code: number;
}
//definicion 
export interface IScanResult{
  meta:{
    serial:string;
    count: number;

  };
  data:{
    n: number;
    rssi:number;
    ssid: string;
    bssid: string;
    channel: number;
    secure: string;
  }[]; //esto indica que es un array de objetos
  code: number;
}