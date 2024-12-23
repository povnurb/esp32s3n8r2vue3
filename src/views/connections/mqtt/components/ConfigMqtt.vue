<script lang="ts" setup>
import { IMqttConfig } from '@/interfaces/mqtt';
import { ref, onMounted, watch } from 'vue';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore } from '@/store/save';
import { isErrorResponse } from '@/utils/utils';
import { getMqttConfig, postMqttConfig } from '@/api/mqtt';
import eventBus from '@/utils/evenBus';
import { IEventCallback } from '@/interfaces/common';

//definiciones
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
//const { toastSuccessMsg, toastErrorMsg, toastInfoMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();

const mqtt = ref<IMqttConfig>({
    mqtt_enabled: false,
    mqtt_server: '',
    mqtt_port: 0,
    mqtt_retain: false,
    mqtt_qos: 0,
    mqtt_id: '',
    mqtt_user: '',
    mqtt_password: '',
    mqtt_clean_sessions: false,
    mqtt_commandTopic: '',
    mqtt_sendTopic: '',
});

onMounted(async () => {
    await getData();
});

//funcion paraadquirir los datos del esp32 la cual se manda a llamar en el onMounted
const getData = async () => {
    try {
        const resp = await getMqttConfig();
        //console.log(resp);
        mqtt.value = resp.mqtt;
    } catch (error: unknown) {
        console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
}


const save = async (): Promise<void> => {
    try {
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción actualizará los parámetros de configuración del broker MQTT del dispositivo.',
            icon: 'warning'
        });
        if (confirmed) {
            const resp = await postMqttConfig(mqtt.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los datos de MQTT");
                await getData();
                saveStore.saveSuccess(true);
            }
        }
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
}

//watch observa los cambios de mqtt.mqtt_enabled
watch(
    () => mqtt.value.mqtt_enabled as boolean,
    (newMessage) => {
        const data: IEventCallback = { message: newMessage };
        eventBus.emit('dataSent', data);
    }
)

</script>

<template>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">Configuración de conectividad</div>
            <div class="card-body">
                <!-- General Form Elements -->
                <!--{{ mqtt }}-->
                <form>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_enable">Habilitar el
                                MQTT</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="mqtt_enable" name="mqtt_enable"
                                        v-model="mqtt.mqtt_enabled">
                                    <label class="form-check-label switch_mqtt_enable" for="mqtt_enable">{{
                                        mqtt.mqtt_enabled ? 'SI' : 'NO' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="mqtt_server">Servidor
                                MQTT</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="text"
                                    placeholder="Dirección del servidor" id="mqtt_server" name="mqtt_server"
                                    v-model="mqtt.mqtt_server" :disabled="!mqtt.mqtt_enabled">
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="mqtt_port">Puerto
                                MQTT</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="number"
                                    placeholder="Puerto de acceso" id="mqtt_port" name="mqtt_port"
                                    v-model="mqtt.mqtt_port" min="0" :disabled="!mqtt.mqtt_enabled"></div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_retain">Mensajes
                                retenidos</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="mqtt_retain" name="mqtt_retain"
                                        v-model="mqtt.mqtt_retain" :disabled="!mqtt.mqtt_enabled">
                                    <label class="form-check-label switch_mqtt_retain" for="mqtt_retain">{{
                                        mqtt.mqtt_retain ? 'SI' : 'NO' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_qos">Calidad del
                                servicio</label>
                            <div class="col-sm-8"><select class="form-select" id="mqtt_qos" name="mqtt_qos"
                                    v-model="mqtt.mqtt_qos" :disabled="!mqtt.mqtt_enabled">
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                </select></div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="mqtt_id">Cliente
                                Id</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="text"
                                    placeholder="Cliente Id MQTT" id="mqtt_id" name="mqtt_id" v-model="mqtt.mqtt_id"
                                    :disabled="!mqtt.mqtt_enabled">
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="mqtt_user">Usuario</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="text"
                                    placeholder="Usuario MQTT" id="mqtt_user" name="mqtt_user" v-model="mqtt.mqtt_user"
                                    :disabled="!mqtt.mqtt_enabled">
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="mqtt_password">Contraseña</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="password"
                                    placeholder="Contraseña MQTT" id="mqtt_password" name="mqtt_password"
                                    v-model="mqtt.mqtt_password" :disabled="!mqtt.mqtt_enabled">
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label"
                                for="mqtt_clean_sessions">Sesiones
                                limpias</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch">
                                    <input class="form-check-input" type="checkbox" id="mqtt_clean_sessions"
                                        name="mqtt_clean_sessions" v-model="mqtt.mqtt_clean_sessions"
                                        :disabled="!mqtt.mqtt_enabled">
                                    <label class="form-check-label switch_mqtt_clean_sessions"
                                        for="mqtt_clean_sessions">{{ mqtt.mqtt_clean_sessions ? 'SI' : 'NO' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-3" id="btnSendMqtt"> <!-- btn auto -->
                        <div class="col-sm-10">
                            <button class="btn btn-primary" type="button" @click="save"><i
                                    class="bi bi-floppy me-1"></i>
                                Guardar
                            </button>
                        </div>
                    </div>
                </form><!-- End General Form Elements -->
            </div>
        </div>
    </div>
</template>