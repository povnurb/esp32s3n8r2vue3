<script lang="ts" setup>
import { getDeviceSettings, uploadDeviceSettings } from '@/api/device';
import useToastAlert from '@/composables/useToastAlert';
import { isErrorResponse } from '@/utils/utils';

const { toastSuccessMsg, toastErrorMsg } = useToastAlert();

const getSettings = async () => {
    try {
        const response = await getDeviceSettings();
        //crear un enlace temporal para descargar el archivo
        const blob = new Blob([response], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        toastErrorMsg('Error al obtener la configuración: ' + error);
    }
}

//funcion para subir el archivo
const uploadSettings = async () => {

    const fileInput = document.getElementById('fileSettings') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    //si exite un archivo
    if (!file) {
        toastErrorMsg("Debes seleccionar un archivo (*.json)");
        return;
    }
    //validar el formato del archivo es un true si ambos son verdaderos
    const isValidType = file.type === "application/json" && file.name === "settings.json";
    if (!isValidType) {
        toastErrorMsg("El archivo seleccionado no es válido debe ser (settings.json)");
        return;
    }
    //validar el tamaño del achivo
    if (file.size > 200 * 1024) { //200 kb
        toastErrorMsg("El archivo es demasiado grande. El tamaño máximo es 200 KB");
        return;
    }
    //subir el archivo
    try {
        const resp = await uploadDeviceSettings(file);
        if (resp.save) {
            toastSuccessMsg(resp.msg ?? 'Operación exitosa'); //el ?? quita esos errores pendejos
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
</script>

<template>
    <div class="col-lg-6">
        <div class="card">
            <div class="card-header">Archivo de configuraciones</div>
            <div class="card-body">
                <h5 class="card-title">Archivo de configuraciones (setting.json).</h5>
                <div class="row mb-3"><label class="col-sm-12 col-form-label" for="fileSettings">Subir el
                        archivo de configuración (settings.json)</label>
                    <div class="col-sm-12"><input class="form-control" type="file" id="fileSettings"
                            accept="application/json"></div>
                </div><button class="btn btn-success" @click="uploadSettings"><i
                        class="bi bi-cloud-arrow-up-fill me-1"></i>Importar</button><label
                    class="col-sm-12 col-form-label mt-3" for="fileFirmware">Descargar archivo de
                    configuración (settings.json)</label>
                <h6 class="text-secondary"><strong>Nota: Use este botón para exportar las configuraciones
                        actuales</strong></h6><button class="btn btn-secondary" @click="getSettings"><i
                        class="bi bi-cloud-download-fill me-1"></i>Descargar</button>
            </div>
        </div>
    </div>
</template>