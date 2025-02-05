<script lang="ts" setup>
import { getDeviceAlarms } from '@/api/device';
import useToastAlert from '@/composables/useToastAlert';
import * as xlsx from 'xlsx';
//const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { toastErrorMsg } = useToastAlert();

const getAlarmas = async () => {
    try {
        const response = await getDeviceAlarms();

        // Convertir el Blob a texto
        const textResponse = await response.text();

        // Imprimir el texto de la respuesta para depuración
        console.log('Text Response:', textResponse);

        // Añadir corchetes para convertirlo en un JSON válido
        const validJsonText = `[${textResponse}]`;

        // Intentar parsear el texto a JSON
        let data;
        try {
            data = JSON.parse(validJsonText);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            console.log('Text Response for inspection:', validJsonText);
            toastErrorMsg('Error al parsear la respuesta: ' + parseError);
            return;
        }

        // Verificar si data es un array
        if (Array.isArray(data)) {
            console.log('Data is an array');
        } else {
            console.error('Data is not an array');
            console.log('Data structure:', JSON.stringify(data, null, 2));
            toastErrorMsg('Los datos no están en el formato esperado.');
            return;
        }

        // Crear un nuevo libro de trabajo
        const workbook: xlsx.WorkBook = xlsx.utils.book_new();

        // Crear una nueva hoja de trabajo a partir de los datos obtenidos
        const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(data);

        // Agregar la hoja al libro
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Alarmas');

        // Escribir el libro a un archivo en formato blob
        const wbout = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });

        // Crear un enlace temporal para descargar el archivo
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'alarmas.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        // Imprimir cualquier error en la consola
        console.log('Error:', error);
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