<script lang="ts" setup>
import { getDeviceAlarms } from '@/api/device';
import useToastAlert from '@/composables/useToastAlert';
//const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { toastErrorMsg } = useToastAlert();

const getAlarmas = async () => {
    try {
        const response = await getDeviceAlarms();
        //crear un enlace temporal para descargar el archivo
        const blob = new Blob([response], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'alarmas.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        toastErrorMsg('Error al obtener las alarmas: ' + error);
    }
}

</script>
<template>
    <div class="card col-md-6 col-xl-6">
        <h5 class="card-title text-center">
            Archivo de alarmas (alarmas.json).
        </h5>
        <div class="card-body">
            <label class="col-sm-12 col-form-label mt-3" for="fileAlarmas">Descargar archivo de
                alarmas (alarmas.json)</label>
            <h6 class="text-secondary"><strong>Nota: Use este botón para exportar las alarmas
                    presentadas</strong></h6><button class="btn btn-secondary" @click="getAlarmas"><i
                    class="bi bi-cloud-download-fill me-1"></i>Descargar</button>
        </div>

    </div>
</template>