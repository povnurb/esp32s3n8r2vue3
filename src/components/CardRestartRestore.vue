<script lang="ts" setup>
import { defineProps, ref } from 'vue';
import ProgressBar from './ProgressBar.vue';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore } from '@/store/save';
import { useRouter } from 'vue-router';
import { isErrorResponse } from '@/utils/utils';
import { postDeviceRestart, postDeviceRestore } from '@/api/device';

const { swalConfirmation } = useSweetAlert();
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const saveStore = useSaveStore();
const router = useRouter();


const props = defineProps({
    title: String,
    subTitle: String,
    buttonIcon: String,
    buttonTitle: String,
    buttonColor: String
});

interface IRestartResponse {
    restart: boolean; //etiqueta que manda el esp 32
}
interface IRestoreResponse {
    restore: boolean; //etiqueta que manda el esp 32
}

type IApiResponse = IRestartResponse | IRestoreResponse

// progress
const title = props.title === 'Reiniciar' ? 'Reiniciar ....' : 'Restableciendo ....';
const percentage = ref(0);

const action = async () => {
    const confirmed = await swalConfirmation({
        title: props.title === 'Reiniciar' ? '¿Desea reiniciar el dispositivo?' : '¿Desea restablecer el dispositivo?',
        text: props.title === 'Reiniciar' ? 'El dispositivo mantiene los datos actuales' : 'Todas las configuraciones del dispositivo vuelven a fábrica',
        icon: 'question'
    });
    if (confirmed) {
        await performAction();
    }
}

const performAction = async () => {
    try {
        const apiCall = props.title === 'Reiniciar' ? postDeviceRestart : postDeviceRestore;
        const resp: IApiResponse = await apiCall();
        if ('restart' in resp && resp.restart) {
            toastSuccessMsg("Dispositivo reiniciado");
            saveStore.resetSave(); //limpia el localstorage
            startTime();
        } else {
            toastSuccessMsg("Restaurando dispositivo");
            saveStore.resetSave(); //limpia el localstorage
            startTime();

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

const startTime = () => {

    percentage.value = 0; // se pone en 100
    const timerInterval = setInterval(() => {
        percentage.value += 10;
        if (percentage.value >= 100) {
            percentage.value = 100;
            clearInterval(timerInterval);
            router.push('/dashboard');
        }
    }, 1000);

}

</script>

<template>
    <div class="card">
        <div class="card-header">{{ props.title }}</div>
        <div class="card-body">
            <h5 class="card-title">{{ props.subTitle }}</h5>
            <button :class="`btn btn-${props.buttonColor}`" @click="action">
                <i :class="`bi bi-${props.buttonIcon}`"></i>
                {{ props.buttonTitle }}
            </button>
            <!-- progress componente -->
            <ProgressBar :title="title" :percentage="percentage" />

        </div>
    </div>
</template>