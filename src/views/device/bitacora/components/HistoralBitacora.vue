<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { getBitacora } from '@/api/bitacora';
import useToastAlert from '@/composables/useToastAlert';
import { ref, defineProps, onMounted } from 'vue';
import { isErrorResponse } from '@/utils/utils';
//https://datatables.net/blog/2022/vue
DataTable.use(DataTablesCore);
const { toastErrorMsg } = useToastAlert();


type IBitacora = {
    nombretec: string;
    fecha: string;
    tipo: string;
    info: string;
};

// Cambiar `laBitacora` para que sea un array de IBitacora
const laBitacora = ref<IBitacora[]>([]); //se cambia de un array de objetos a un array de arrays

const data = ref<string[][]>([]); // Array de arrays para la DataTable

// cuando se carga el componente
onMounted(async () => {
    await elRegistro();
});

const elRegistro = async () => {
    try {
        const resp = await getBitacora();
        if (Array.isArray(resp)) {
            // Mapear los datos para la DataTable
            laBitacora.value = resp.map((item) => ({
                nombretec: item.nombretec,
                fecha: item.fecha,
                tipo: item.tipo,
                info: item.info,
            }));
        } else {
            console.error("La respuesta no es un array:", resp);
        }
        console.log(laBitacora.value);
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
// lo qe se necesita
/*
[
  ["El historial de alarmas inicia", "26-12-2024 21:36", "Inactivo"],
  ["ALARMA IO38", "26-12-2024 21:36", "Activo"]
];
*/


</script>

<template>
    <div class="col-lg-12 card ">
        <h5 class="card-title">Aquí puedes consultar los eventos registrados</h5>
        <DataTable :data="laBitacora.map(item => [item.nombretec, item.fecha, item.tipo, item.info])"
            class="display table datatable">
            <thead>
                <tr>
                    <th>
                        <b>Tecnico </b>
                    </th>
                    <th>fecha</th>
                    <!--<th>Value</th>-->
                    <!--<th data-type="date" data-format="YYYY/DD/MM">Start Date</th>-->
                    <th>Categoria</th>
                    <th>info</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>