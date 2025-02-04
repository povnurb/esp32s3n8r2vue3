<script lang="ts" setup>

import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { IMqttConfig } from '@/interfaces/mqtt';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore } from '@/store/save';
import { isErrorResponse } from '@/utils/utils';
import { getMqttConfig, postMqttConfig } from '@/api/mqtt';
import eventBus from '@/utils/evenBus';
import { IEventCallback } from '@/interfaces/common';

//definiciones
//const { toastSuccessMsg, toastErrorMsg, toastInfoMsg } = useToastAlert();
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();

const mqtt = ref<IMqttConfig>({
    mqtt_enabled: false,
    mqtt_time_send: false,        // 
    mqtt_time_interval: 0,      // 
    mqtt_status_send: false,       // 
    mqtt_commandTopic_gerencia: '',
    mqtt_commandTopic_ciudad: '',
    mqtt_commandTopic_central: '',
    mqtt_commandTopic_sala: '',
    mqtt_IDlast4: '',
    mqtt_willTopic: '',
    mqtt_sendTopic: '',
    mqtt_commandTopic: '',
    mqtt_willMessage: '',
    mqtt_willQos: 0,
    mqtt_willRetain: false,
});

const receivedData = ref<IEventCallback>({ message: true });
const enabled = ref<boolean>(true);

onMounted(async () => {
    await getData();
    eventBus.on('dataSent', handleData);
    enabled.value = mqtt.value.mqtt_enabled as boolean; //agregado por lalo para funcionar como quiero

});

onBeforeUnmount(() => {
    eventBus.off('dataSent', handleData);
    enabled.value = true;
})

//funcion paraadquirir los datos del esp32 la cual se manda a llamar en el onMounted
const getData = async () => {
    try {
        const resp = await getMqttConfig();
        //console.log(resp);
        mqtt.value = resp.mqtt;
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


const handleData = (data: IEventCallback) => {
    receivedData.value = data;
    if (receivedData.value.message !== '') {
        if (typeof receivedData.value.message === 'boolean') {
            enabled.value = receivedData.value.message;
        }
    }
}

const save = async (): Promise<void> => {
    try {
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción actualizará los párametros de configuración del broker MQTT del dispositivo.',
            icon: 'warning'
        });
        if (confirmed) {
            console.log(mqtt.value);
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

watch(
    () => mqtt.value.mqtt_enabled as boolean,
    (newMessage) => {
        enabled.value = newMessage;
    }
)


</script>

<template>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">Configuración de los mensajes</div>
            <div class="card-body">
                <!-- General Form Elements -->
                <form>
                    <div><!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_time_send">Enviar
                                datos
                                del dispositivo</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch"><input class="form-check-input" type="checkbox"
                                        id="mqtt_time_send" name="mqtt_time_send" v-model="mqtt.mqtt_time_send"
                                        :disabled="!enabled"><label class="form-check-label switch_mqtt_time_send"
                                        for="mqtt_time_send">{{ mqtt.mqtt_time_send ? 'SI' : 'NO' }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div> <!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                                for="mqtt_time_interval">Intervalo en segundos (s)</label>
                            <div class="col-sm-8 mt-2"><input class="form-control" type="number" placeholder="60"
                                    id="mqtt_time_interval" name="mqtt_time_interval" v-model="mqtt.mqtt_time_interval"
                                    min="1" max="3600" :disabled="!enabled"></div>
                        </div>
                    </div>
                    <div><!-- auto -->
                        <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_status_send">Enviar
                                estados</label>
                            <div class="col-sm-8 mt-2">
                                <div class="form-check form-switch"><input class="form-check-input" type="checkbox"
                                        id="mqtt_status_send" name="mqtt_status_send" v-model="mqtt.mqtt_status_send"
                                        :disabled="!enabled"><label class="form-check-label switch_mqtt_status_send"
                                        for="mqtt_status_send">{{ mqtt.mqtt_status_send ? 'SI' : 'NO' }}</label></div>
                            </div>
                        </div>
                    </div>
                    <!-- auto -->
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_commandTopic_gerencia">Gerencia</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Primera sección del tópico"
                                id="mqtt_commandTopic_gerencia" name="mqtt_commandTopic_gerencia"
                                v-model="mqtt.mqtt_commandTopic_gerencia" :disabled="!enabled">
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_commandTopic_ciudad">Ciudad</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Segunda sección del tópico"
                                id="mqtt_commandTopic_ciudad" name="mqtt_commandTopic_ciudad"
                                v-model="mqtt.mqtt_commandTopic_ciudad" :disabled="!enabled">
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_commandTopic_central">Central</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Tercera sección del tópico"
                                id="mqtt_commandTopic_central" name="mqtt_commandTopic_central"
                                v-model="mqtt.mqtt_commandTopic_central" :disabled="!enabled">
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_commandTopic_sala">Sala</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="cuarta sección del tópico"
                                id="mqtt_commandTopic_sala" name="mqtt_commandTopic_sala"
                                v-model="mqtt.mqtt_commandTopic_sala" :disabled="!enabled">
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="mqtt_IDlast4">ID ultimos
                            (4)</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Ultimos 4 digitos de N/S"
                                id="mqtt_IDlast4" name="mqtt_IDlast4" v-model="mqtt.mqtt_IDlast4" disabled>
                            <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Solo informativo"></i>
                        </div>
                    </div>

                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="mqtt_sendTopic">Tópico
                            de publicación</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Topico de publicación"
                                id="mqtt_sendTopic" name="mqtt_sendTopic" v-model="mqtt.mqtt_sendTopic" disabled><i
                                class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Solo informativo"></i>
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_commandTopic">Tópico
                            de comandos</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Topico de comandos"
                                id="mqtt_commandTopic" name="mqtt_commandTopic" v-model="mqtt.mqtt_commandTopic"
                                disabled><i class="bi bi-info-circle me-1" data-bs-toggle="tooltip"
                                data-bs-placement="right" title="Solo informativo"></i>
                        </div>
                    </div>
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2" for="mqtt_willTopic">Tópico
                            última voluntad</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Topico última voluntad"
                                id="mqtt_willTopic" name="mqtt_willTopic" v-model="mqtt.mqtt_willTopic" disabled>
                            <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                title="Solo informativo"></i>
                        </div>
                    </div>
                    <!-- auto -->
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_willQoS">QoS última
                            voluntad</label>
                        <div class="col-sm-8"><select class="form-select" id="mqtt_willQoS" name="mqtt_willQoS"
                                v-model="mqtt.mqtt_willQos" :disabled="!enabled">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select></div>
                    </div>
                    <!-- auto -->
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label" for="mqtt_willRetain">Mensajes
                            retenidos Last-Will</label>
                        <div class="col-sm-8 mt-2">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" id="mqtt_willRetain"
                                    name="mqtt_willRetain" v-model="mqtt.mqtt_willRetain" :disabled="!enabled">
                                <label class="form-check-label switch_mqtt_willRetain" for="mqtt_willRetain">{{
                                    mqtt.mqtt_willRetain ? 'SI' : 'NO' }}</label>
                            </div>
                        </div>
                    </div>
                    <!-- auto -->
                    <div class="row mb-3 mt-3"><label class="col-sm-4 col-form-label mt-2"
                            for="mqtt_willMessage">Payload última voluntad</label>
                        <div class="col-sm-8 mt-2">
                            <input class="form-control" type="text" placeholder="Payload última voluntad"
                                id="mqtt_willMessage" name="mqtt_willMessage" v-model="mqtt.mqtt_willMessage"
                                :disabled="!enabled">
                        </div>
                    </div>
                    <div class="row mb-3"><!-- auto -->
                        <div class="col-sm-10"><button class="btn btn-primary" type="button" :disabled="!enabled"
                                @click="save">
                                <i class="bi bi-floppy me-1"></i>Guardar
                            </button>
                        </div>
                    </div>
                </form><!-- End General Form Elements -->
            </div>
        </div>
    </div>
</template>