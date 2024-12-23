<script setup lang="ts">
import { RouterView } from 'vue-router';
import { IAlarmasConfig } from '@/interfaces';
import FooterVue from './footer/FooterVue.vue';
import HeaderVue from './header/HeaderVue.vue';
import SidebarVue from './sidebar/SidebarVue.vue';
import AlertMessage from '@/components/AlertMessage.vue';
import AlarmMessage from '@/components/AlarmMessage.vue';
import { scanAlarmas } from '@/api/alarms';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { useSaveStore, useSaveStoreAlarma } from '@/store/save';
import { onMounted, ref, watch } from 'vue';
const saveStore = useSaveStore();
const saveStoreAlarma = useSaveStoreAlarma();
const { toastErrorMsg } = useToastAlert();

const save = ref(false);
const saveAlarm = ref(false);

const alarmas = ref<IAlarmasConfig>({

})


onMounted(async () => {
    await scanAlarms();
    save.value = saveStore.getSaveStore();
    saveAlarm.value = saveStoreAlarma.getAlarmaStore();
    //setInterval(saveStoreAlarma.getAlarmaStore(), 1000);
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
/*
watch(
    () => alarmas.value as IAlarmasConfig,
    (newMessage) => {
        if (newMessage) {
            alarmas.value = newMessage;
            console.log(newMessage);
        }
    }
)
*/



const scanAlarms = async () => {
    try {
        const resp = await scanAlarmas();
        alarmas.value = resp;
        //status1 = alarmas.value?.alarmas?.[0].status as boolean;
        //status2 = alarmas.value?.alarmas?.[1].status as boolean;

        if (alarmas.value?.alarmas?.[0].status || alarmas.value?.alarmas?.[1].status || alarmas.value?.alarmas?.[2].status || alarmas.value?.alarmas?.[3].status || alarmas.value?.alarmas?.[4].status || alarmas.value?.alarmas?.[5].status || alarmas.value?.alarmas?.[6].status || alarmas.value?.alarmas?.[7].status) {
            //console.log(status1, status2, status3, status4, status5, status6, status7, status8);
            saveStoreAlarma.alarmaSuccess(true);
            saveAlarm.value = true;
            toastErrorMsg("Se presento una alarma");


        }
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            saveStoreAlarma.alarmaError();
        }
    }
}

</script>

<template>
    <div>
        <HeaderVue />
        <SidebarVue />
        <main id="main" class="main">
            <section>
                <div class="row">
                    <AlertMessage v-if="save" />
                    <AlarmMessage v-if="saveAlarm" />
                </div>

            </section>
            <RouterView />
        </main><!-- End #main -->
        <FooterVue />
    </div>
</template>