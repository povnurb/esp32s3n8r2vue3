<script lang="ts" setup>
import { getDownloadBitacora } from '@/api/bitacora';
import useToastAlert from '@/composables/useToastAlert';
const { toastErrorMsg } = useToastAlert();

const getBitacora = async () => {
    try {
        const response = await getDownloadBitacora();
        //crear un enlace temporal para descargar el archivo
        const blob = new Blob([response], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bitacora.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        toastErrorMsg('Error al obtener la bitácora: ' + error);
    }
}

</script>
<template>
    <div class="card col-md-6 col-xl-6">
        <h5 class="card-title text-center">
            Archivo de la bitácora (bitacora.json).
        </h5>
        <div class="card-body">
            <label class="col-sm-12 col-form-label mt-3" for="fileAlarmas">Descargar archivo de
                la bitácora (bitacora.json)</label>
            <h6 class="text-secondary"><strong>Nota: Use este botón para exportar el archivo de los
                    registros en la bitácora</strong></h6><button class="btn btn-secondary" @click="getBitacora"><i
                    class="bi bi-cloud-download-fill me-1"></i>Descargar</button>
        </div>

    </div>
</template>