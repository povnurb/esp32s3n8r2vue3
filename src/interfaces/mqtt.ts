

export interface IMqttConfig {
    mqtt_enabled?: boolean;      // Habilitar el MQTT
    mqtt_server?: string;       // Dirección del servidor MQTT
    mqtt_port?: number;         // Puerto del servidor MQTT
    mqtt_retain?: boolean;      // Mensajes retenidos
    mqtt_qos?: number;          // Calidad del servicio
    mqtt_id?: string;           // Cliente Id
    mqtt_user?: string;         // Usuario
    mqtt_password?: string;     // Contraseña
    mqtt_clean_sessions?: boolean; // Sesiones limpias
    mqtt_time_send?: boolean;    // Enviar datos del dispositivo
    mqtt_time_interval?: number;  // Intervalo en segundos de envio de datos
    mqtt_status_send?: boolean;   // Enviar estados
    mqtt_commandTopic_gerencia?: string,
    mqtt_commandTopic_ciudad?: string,
	mqtt_commandTopic_central?: string,
	mqtt_commandTopic_sala?: string,
    mqtt_IDlast4?: string,
    mqtt_willTopic?: string,
    mqtt_sendTopic?: string,
    mqtt_commandTopic?: string,
    mqtt_willMessage?: string,
    mqtt_willQos?: number,
    mqtt_willRetain?: boolean,
}

export interface IMqttResponse{
    serial: string;
  device: string;
  rssiStatus: number;
  wifiQuality: number;
  wifiStatus: boolean;
  mqttStatus: boolean;
  mqtt: IMqttConfig; //hace referencia al de arriba
  code: number;
}