<script lang="ts" setup>
import { defineProps } from 'vue';
import { IMqttInfo, IWifiInfo } from '@/interfaces';

const props = defineProps<{
    connection: IWifiInfo | IMqttInfo //puede ser cualquiera de las dos
}>();

// wifi
const wifiKeysMap: Record<string, keyof IWifiInfo> = {
    "SSID WiFi": "wifi_ssid",
    "IPv4 WiFi": "wifi_ipv4",
    "MAC WiFi": "wifi_mac",
}
// mqtt
const mqttKeysMap: Record<string, keyof IMqttInfo> = {
    "Servidor MQTT": "mqtt_server",
    "Usuario MQTT": "mqtt_user",
    "Cliente ID MQTT": "mqtt_id",
}

// determinar el tipo de conexion wifi
const isWifi = (connection: IWifiInfo | IMqttInfo | undefined): connection is IWifiInfo => {
    return (connection as IWifiInfo).wifi_status !== undefined;
};

</script>

<template>
    <div class="col-xxl-6">
        <!-- Automatico -->
        <div class="card">

            <div class="filter"><a class="icon show" href="#" data-bs-toggle="dropdown"><i
                        class="bi bi-three-dots"></i></a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li class="dropdown-header text-start">
                        <h6>{{ isWifi(props.connection) ? 'WIFI' : 'MQTT' }}</h6>
                    </li>
                    <li class="dropdown-item">
                        <RouterLink class="dropdown-item"
                            :to="isWifi(props.connection) ? { name: 'WiFi' } : { name: 'MQTT' }">
                            Configurar
                        </RouterLink>
                    </li>
                </ul>
            </div>

            <div class="card-body">
                <h5 class="card-title">{{ isWifi(props.connection) ? 'Inalámbrico' : 'Broker MQTT' }}<span> |
                        Conexión</span></h5>
                <div class="table-responsive">
                    <table class="table table-borderless datatable align-middle">
                        <tbody>
                            <template v-if="isWifi(props.connection) && props.connection">
                                <tr>
                                    <th scope="row">Estado WiFi:</th>
                                    <td>
                                        <span
                                            :class="{ 'badge bg-success': props.connection.wifi_status, 'badge bg-danger': !props.connection.wifi_status }">
                                            {{ props.connection.wifi_status ? 'ONLINE' : 'OFFLINE' }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-for="(value, key) in wifiKeysMap" :key="key">
                                    <th scope="row" class="w-35">{{ key }}</th>
                                    <th class="w-65">{{ props.connection[value] }}</th>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <th scope="row">Estado MQTT:</th>
                                    <td>
                                        <span
                                            :class="{ 'badge bg-success': props.connection.mqtt_status, 'badge bg-danger': !props.connection.mqtt_status }">
                                            {{ props.connection.mqtt_status ? 'ONLINE' : 'OFFLINE' }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-for="(value, key) in mqttKeysMap" :key="key">
                                    <th scope="row" class="w-35">{{ key }}</th>
                                    <th class="w-65">{{ props.connection[value] }}</th>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>