import { IMqttConfig, IMqttResponse } from "@/interfaces/mqtt";
import axiosServices from "@/utils/axios";

//traer la informacion del mqtt
export const getMqttConfig = async (): Promise<IMqttResponse> =>{
    const resp = await axiosServices.get(`connections/mqtt`);
    return resp.data;
    // la data seria como el siguiente ejemplo
    /**
    {
	"serial": "ESP32-S3E127843CA0B8",
	"device": "ESP32-S3",
	"rssiStatus": -40,
	"wifiQuality": 100,
	"wifiStatus": true,
	"mqttStatus": false,
	"mqtt": {
		"mqtt_enabled": true,
		"mqtt_server": "140.84.188.157",
		"mqtt_port": 1883,
		"mqtt_retain": false,
		"mqtt_qos": 0,
		"mqtt_id": "ESP32-S3E127843CA0B8",
		"mqtt_user": "asignar",
		"mqtt_password": "public",
		"mqtt_clean_session": true,
		"mqtt_time_send": true,
		"mqtt_time_interval": 10,
		"mqtt_status_send": true,
		"mqtt_commandTopic_gerencia": "coatza",
		"mqtt_commandTopic_ciudad": "coatza",
		"mqtt_commandTopic_central": "coaigl",
		"mqtt_commandTopic_sala": "uninet2",
		"mqtt_IDlast4": "A0B8",
		"mqtt_commandTopic": "coatza/coatza/coaigl/uninet2/A0B8/command",
		"mqtt_sendTopic": "coatza/coatza/coaigl/uninet2/A0B8/device",
		"mqtt_willTopic": "coatza/coatza/coaigl/uninet2/A0B8/status",
		"mqtt_willMessage": "{\"Device\":\"HGO-PTTI-2\", \"connected\":false}",
		"mqtt_willQos": 0,
		"mqtt_willRetain": false
	},
	"code": 1
}
    */

}

//funcion para salvar la información del mqtt
export const postMqttConfig = async (data: IMqttConfig | null): Promise<{save: boolean}> => { 
    const resp = await axiosServices.post('connections/mqtt',data);
    return resp.data;
};