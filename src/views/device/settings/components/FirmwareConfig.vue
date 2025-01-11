<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from '@/components/ProgressBar.vue';
import useToastAlert from '@/composables/useToastAlert';
import { isErrorResponse } from '@/utils/utils';
import { uploadDeviceFirmware } from '@/api/device';
import { useWebsocketsStore } from '@/store/websockets';

const { toastSuccessMsg, toastErrorMsg, toastInfoMsg } = useToastAlert();
const websocketsMessage = useWebsocketsStore();
const router = useRouter();

// progress
const title = 'Flash ocupada en: (%)';
const percentage = ref(0);

// upload firmware
const uploaddFirmware = async () => {
    const fileInput = document.getElementById('fileFirmware') as HTMLInputElement; // para el tipado de TS
    const file = fileInput.files?.[0];

    //validar si hay un archivo
    if (!file) {
        toastErrorMsg("Debes seleccionar un archivo (*.bin)");
        return;
    }
    //validar el formato del archivo
    const validFileFormats = file.type === 'application/octet-stream';
    if (!validFileFormats) {
        toastErrorMsg("El archivo seleccionado no es un firmware o filesystem valido.");
        return;
    }
    //validar el tamaño del archivo
    const fileSizeLimit = 4000000; // 4MB
    if (file.size > fileSizeLimit) {
        toastErrorMsg("El archivo seleccionado es demasiado grande. El tamaño máximo es 4MB.");
        return;
    }
    //subir el archivo
    try {
        toastInfoMsg(`Iniciando proceso de importación de archivo`);
        const resp = await uploadDeviceFirmware(file);
        if (resp.save) {
            toastSuccessMsg(`${resp.msg} actualizado correctamente`); //el ?? quita esos errores pendejos
            startTime(); //comienza el contador de tiempo
        } else {
            toastErrorMsg(resp.msg ?? 'Error desconocido'); //
        }
        fileInput.value = '';
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response.data.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            fileInput.value = '';
        }
    }
}

//este watch se encarga de monitorear el porcentaje del firmware
watch(
    () => websocketsMessage.flashFirmware,
    (newValue) => {
        if (newValue) {
            percentage.value = newValue;
        }
    }
)

const startTime = () => {

    const timerInterval = setInterval(() => {
        if (percentage.value >= 100) {
            percentage.value = 100;
            clearInterval(timerInterval);
            router.push('/dashboard');
        } else {
            clearInterval(timerInterval);
            router.push('/dashboard');
        }
    }, 15000);

}

</script>

<template>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">Firmware o Filesystem</div>
            <div class="card-body">
                <h5 class="card-title">Use este botón para actualizar el Firmware o el FileSystem del
                    dispositivo.</h5>
                <div class="row mb-3"><label class="col-sm-12 col-form-label" for="fileFirmware">Firmware
                        &amp; FileSystem</label>
                    <div class="col-sm-12"><input class="form-control" type="file" id="fileFirmware"
                            accept="application/octet-stream"></div>
                    <h6 class="text-secondary mt-3"><strong>Nota: Si el nombre de archivo incluye spiffs,
                            actualiza la partición del FileSystem, despues esperar 10 seg.</strong></h6>
                </div><button class="btn btn-warning" @click="uploaddFirmware"><i
                        class="bi bi-box-arrow-in-down me-1"></i>Importar</button>
                <!-- progress -->
                <ProgressBar :title="title" :percentage="percentage" />
            </div>
        </div>
    </div>
</template>