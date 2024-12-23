<script lang="ts" setup>
import { getWifiConfig, postWifiConfig } from '@/api/wifi';
import { IWifiConfig } from '@/interfaces';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import useToastAlert from '@/composables/useToastAlert';
import { isErrorResponse } from '@/utils/utils';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore } from '@/store/save';
// para escuchar los eventos
// para emitir eventos del ScanWifi.vue
import evenBus from '@/utils/evenBus';
import { IEventCallback } from '@/interfaces/common';


//definiciones
const { toastSuccessMsg, toastErrorMsg, toastInfoMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();

// para alamacenar la data del emit
const receivedData = ref<IEventCallback>({ message: '' });

const wifi = ref<IWifiConfig>({
    wifi_mode: false,
    wifi_ssid: '',
    wifi_password: '',
    wifi_ssid2: '',
    wifi_password2: '',
    wifi_ip_static: false,
    wifi_ipv4: '',
    wifi_subnet: '',
    wifi_gateway: '',
    wifi_dns_primary: '',
    wifi_dns_secondary: '',
    ap_ssid: '',
    ap_password: '',
    ap_visibility: false,
    ap_channel: 0,
    ap_connect: 0
});

let primera = false;
//definicion del manejador de la data
const handleData = (data: IEventCallback) => {

    receivedData.value = data;
    if (receivedData.value.message !== '' && wifi.value) {
        if (typeof receivedData.value.message === 'string' && primera == false) {
            wifi.value.wifi_ssid = receivedData.value.message;
            toastInfoMsg(`Red Wifi seleccionada: "${receivedData.value.message}"`);
            primera = true; // para que solo se actualice la red wifi una vez
        } else if (typeof receivedData.value.message === 'string' && primera == true) {
            wifi.value.wifi_ssid2 = receivedData.value.message;
            toastInfoMsg(`Red Wifi seleccionada: "${receivedData.value.message}"`);
            primera = false; // para que solo se actualice la red wifi una vez
        }
    }
};

// cuando se carga el componente
onMounted(async () => {
    await getData();
    evenBus.on('dataSent', handleData); //para que se quede escuchando
});

onBeforeUnmount(() => { //se desmonta el componente
    evenBus.off('dataSent', handleData); //para que se deje de escuchar
    receivedData.value.message = '';
});

const getData = async (): Promise<void> => {
    try {
        const resp = await getWifiConfig();
        wifi.value = resp.wifi;
        //console.log('Información del WiFi obtenida:', resp);
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
};

const save = async (): Promise<void> => {
    try {
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción actualizará la configuración de conexión wifi del dispositivo.',
            icon: 'warning'
        });
        if (confirmed) {
            const resp = await postWifiConfig(wifi.value);
            if (resp) {
                toastSuccessMsg('Cambios guardados con éxito');
                //volvemos a traer la información de la data
                await getData();
                saveStore.saveSuccess(true);//true
            }

        }
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            saveStore.saveError();//false
        }
    }
}

</script>

<template>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">Configuración del WiFi</div>
            <div class="card-body">
                <!-- General Form Elements -->
                <form>
                    <div>
                        <!-- auto - switch mode -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="wifi_mode">Modo
                                WiFi</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="wifi_mode" name="wifi_mode"
                                        v-model="wifi.wifi_mode">
                                    <label class="form-check-label switch_wifi_mode" for="wifi_mode">{{ wifi.wifi_mode
                                        ? 'CLIENTE' : 'AP' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div>
                        <!-- auto - input ssid -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="wifi_ssid">SSID
                                Estación 1</label>
                            <div class="col-sm-8 mt-2"><input class="form-control " type="text"
                                    placeholder="Nombre de la red" id="wifi_ssid" name="wifi_ssid"
                                    v-model="wifi.wifi_ssid" :disabled="!wifi.wifi_mode">
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- auto - input password -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="wifi_password">Contraseña
                                Estación 1</label>
                            <div class="col-sm-8 mt-2"><input class="form-control " type="password"
                                    placeholder="Contraseña de la red" id="wifi_password" name="wifi_password"
                                    v-model="wifi.wifi_password" :disabled="!wifi.wifi_mode">
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- auto - input ssid -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="wifi_ssid2">SSID
                                Estación 2</label>
                            <div class="col-sm-8 mt-2"><input class="form-control " type="text"
                                    placeholder="Nombre de la red2" id="wifi_ssid2" name="wifi_ssid2"
                                    v-model="wifi.wifi_ssid2" :disabled="!wifi.wifi_mode">
                            </div>
                        </div>
                    </div>
                    <div>
                        <!-- auto - input password -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="wifi_password">Contraseña
                                Estación 2</label>
                            <div class="col-sm-8 mt-2"><input class="form-control " type="password"
                                    placeholder="Contraseña de la red" id="wifi_password2" name="wifi_password2"
                                    v-model="wifi.wifi_password2" :disabled="!wifi.wifi_mode">
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3 mt-3">
                        <!-- Accordion configuración modo cliente -->
                        <div class="accordion accordion-flush" id="accordionCliente">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-Cliente">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseCliente" aria-expanded="false"
                                        aria-controls="flush-collapseCliente">
                                        Opciones avanzadas modo cliente
                                    </button>
                                </h2>
                                <div id="flush-collapseCliente" class="accordion-collapse collapse"
                                    aria-labelledby="flush-Cliente" data-bs-parent="#accordionCliente">
                                    <div class="accordion-body">
                                        <div>
                                            <!-- auto - switch DHCP -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label"
                                                    for="wifi_ip_static">IP estatica</label>
                                                <div class="col-sm-8 mt-2">
                                                    <div class="form-check form-switch">
                                                        <input class="form-check-input wifi client" type="checkbox"
                                                            id="wifi_ip_static" name="wifi_ip_static"
                                                            v-model="wifi.wifi_ip_static">
                                                        <label class="form-check-label switch_wifi_ip_static"
                                                            for="wifi_ip_static">{{ wifi.wifi_ip_static ? 'SI' : 'NO'
                                                            }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input ipv4 -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="wifi_ipv4">Dirección IPv4</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control wifi client ip"
                                                        type="text" placeholder="192.168.0.10" id="wifi_ipv4"
                                                        name="wifi_ipv4" v-model="wifi.wifi_ipv4"
                                                        :disabled="!wifi.wifi_mode || !wifi.wifi_ip_static">
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input Subnet -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="wifi_subnet">Máscara de subred</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control wifi client ip"
                                                        type="text" placeholder="255.255.255.240" id="wifi_subnet"
                                                        name="wifi_subnet" v-model="wifi.wifi_subnet"
                                                        :disabled="!wifi.wifi_mode || !wifi.wifi_ip_static">
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input Gateway -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="wifi_gateway">Puerta de enlace</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control wifi client ip"
                                                        type="text" placeholder="192.168.0.1" id="wifi_gateway"
                                                        name="wifi_gateway" v-model="wifi.wifi_gateway"
                                                        :disabled="!wifi.wifi_mode || !wifi.wifi_ip_static">
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input dns_primary -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="wifi_dns_primary">DNS primario</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control wifi client ip"
                                                        type="text" placeholder="192.168.0.1" id="wifi_dns_primary"
                                                        name="wifi_dns_primary" v-model="wifi.wifi_dns_primary"
                                                        :disabled="!wifi.wifi_mode || !wifi.wifi_ip_static">
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input dns_Secondary -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="wifi_dns_secondary">DNS secundario</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control wifi client ip"
                                                        type="text" placeholder="8.8.8.8" id="wifi_dns_secondary"
                                                        name="wifi_dns_secondary" v-model="wifi.wifi_dns_secondary"
                                                        :disabled="!wifi.wifi_mode || !wifi.wifi_ip_static">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- End Accordion configuración modo cliente -->
                    </div>
                    <hr>
                    <div>
                        <!-- auto - input Ap Ssid -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="ap_ssid">SSID punto
                                de
                                acceso</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="text"
                                    placeholder="Nombre del punto de acceso" id="ap_ssid" name="ap_ssid"
                                    v-model="wifi.ap_ssid" :disabled="wifi.wifi_mode"></div>
                        </div>
                    </div>
                    <div>
                        <!-- auto - input Ap Password -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="ap_password">Contraseña
                                punto de acceso</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="password"
                                    placeholder="Contraseña del punto de acceso" id="ap_password" name="ap_password"
                                    v-model="wifi.ap_password" :disabled="wifi.wifi_mode"></div>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <!-- Accordion configuración modo punto de acceso -->
                        <div class="accordion accordion-flush" id="accordionAP">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-AP">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseAP" aria-expanded="false"
                                        aria-controls="flush-collapseAP">
                                        Opciones avanzadas modo punto de acceso
                                    </button>
                                </h2>
                                <div id="flush-collapseAP" class="accordion-collapse collapse"
                                    aria-labelledby="flush-AP" data-bs-parent="#accordionAP">
                                    <div class="accordion-body">
                                        <div id="switchVisibility">
                                            <!-- auto - switch ap visibility -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label"
                                                    for="ap_visibility">Oculto</label>
                                                <div class="col-sm-8 mt-2">
                                                    <div class="form-check form-switch"><input class="form-check-input"
                                                            type="checkbox" id="ap_visibility" name="ap_visibility"
                                                            v-model="wifi.ap_visibility"
                                                            :disabled="wifi.wifi_mode"><label
                                                            class="form-check-label switch_ap_visibility"
                                                            for="ap_visibility">{{ wifi.ap_visibility ? 'SI' : 'NO'
                                                            }}</label></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input Ap chanel -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="ap_chanel">Canal
                                                    de radio</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control" type="number"
                                                        placeholder="Permitido del 1 al 13" id="ap_chanel"
                                                        name="ap_chanel" v-model="wifi.ap_channel" min="1" max="13"
                                                        :disabled="wifi.wifi_mode">
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <!-- auto - input Ap connect -->
                                            <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                                    for="ap_connect">Conexiones permitidas</label>
                                                <div class="col-sm-8 mt-2"><input class="form-control" type="number"
                                                        placeholder="Valores Min: 0 - Máx: 8" id="ap_connect"
                                                        name="ap_connect" v-model="wifi.ap_connect" min="1" max="8"
                                                        :disabled="wifi.wifi_mode">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div><!-- End Accordion configuración modo punto de acceso -->
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-10">
                            <button class="btn btn-primary" type="button" @click="save">
                                <i class="bi bi-floppy me-1"></i>
                                Guardar
                            </button>
                        </div>
                    </div>
                </form><!-- End General Form Elements -->
            </div>
        </div>
    </div>
</template>