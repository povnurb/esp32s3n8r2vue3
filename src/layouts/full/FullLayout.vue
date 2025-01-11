<script setup lang="ts">
import { RouterView } from 'vue-router';
import { IAlarmasConfig } from '@/interfaces';
import { IApiIndexResponseWs } from '@/interfaces';
import FooterVue from './footer/FooterVue.vue';
import HeaderVue from './header/HeaderVue.vue';
import SidebarVue from './sidebar/SidebarVue.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import AlertaMemoria from '@/components/AlertaMemoria.vue';
import AlarmMessage from '@/components/AlarmMessage.vue';
import { scanAlarmas } from '@/api/alarms';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { useSaveStore, useSaveStoreAlarma, useSaveStoreSpiffs } from '@/store/save';
import { useWebsocketsStore } from '@/store/websockets';
import { onMounted, onUnmounted, ref, watch, reactive } from 'vue';
const saveStore = useSaveStore();
const saveStoreAlarma = useSaveStoreAlarma();
const saveStoreSpiffs = useSaveStoreSpiffs();
const { toastErrorMsg } = useToastAlert();
const mostrar = ref(true);
const websocketsMessage = useWebsocketsStore();//para el index
const save = ref(false);
const saveAlarm = ref(false);
const saveSpiffs = ref(false);

const alarmas = ref<{ status: boolean }[]>([]);

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
    // Ejecuta la función al montar el componente
    scanAlarms();

    // Configura un intervalo para actualizar periódicamente
    intervalId = setInterval(scanAlarms, 5000); // Cada 5 segundos

    save.value = saveStore.getSaveStore();
    saveAlarm.value = saveStoreAlarma.getAlarmaStore();
    saveSpiffs.value = saveStoreSpiffs.getspiffsStore();
});

onUnmounted(() => {
    // Limpia el intervalo cuando se desmonte el componente
    clearInterval(intervalId);

});

watch(
    () => saveStore.getSaveStore(), (newValue) => {
        save.value = newValue;
    }
);
watch(
    () => saveStoreAlarma.getAlarmaStore(), (newValueAlarm) => {
        saveAlarm.value = newValueAlarm; //segun si cambia de valor 
    }
);
watch(
    () => saveStoreSpiffs.getspiffsStore(), (newValueSpiffs) => {
        saveSpiffs.value = newValueSpiffs; //segun si cambia de valor 
    }
);

watch(
    () => alarmas.value.map(a => a.status),
    (newValues, oldValues) => {
        console.log('Cambio detectado:', { oldValues, newValues });
        if (newValues.some(status => status)) {
            console.log('Alarma detectada, ejecutando acción.');
            saveStoreAlarma.alarmaSuccess(true);
            saveAlarm.value = true;

        }
        // Si todos los valores son falsos, mostrar será falso, de lo contrario, será verdadero
        mostrar.value = newValues.every(status => !status);
    },
    { deep: true }
);

watch(
    () => websocketsMessage.message as IApiIndexResponseWs,
    (newMessage) => {
        if ((newMessage.info.spiffs_used / newMessage.info.device_spiffs) * 100 >= 60) {
            //saveStoreSpiffs.alarmaSuccess(true);
            saveStoreSpiffs.spiffsSuccess(true);
            saveSpiffs.value = true;

        }
    }
)

const scanAlarms = async () => {
    try {
        const resp = await scanAlarmas();
        console.log('Datos obtenidos de la API:', resp);

        alarmas.value = (resp.alarmas || []).map(alarm => ({
            status: alarm.status ?? false,
        }));
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            saveStoreAlarma.alarmaError();
        }
    }
};

</script>

<template>
    <div>
        <HeaderVue />
        <SidebarVue />
        <main id="main" class="main">
            <section>
                <div class="row">
                    <AlertMessage v-if="save" />
                    <AlarmMessage v-if="saveAlarm" :mostrar="mostrar" />
                    <AlertaMemoria v-if="saveSpiffs" />
                </div>

            </section>
            <RouterView />
        </main><!-- End #main -->
        <FooterVue />
    </div>
</template>