<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { getHistorial } from '@/api/alarms';
import useToastAlert from '@/composables/useToastAlert';
import { ref, defineProps, onMounted } from 'vue';
//import { IHistory } from '@/interfaces/infoDashboard';
import { isErrorResponse } from '@/utils/utils';
//https://datatables.net/blog/2022/vue
DataTable.use(DataTablesCore);
const { toastErrorMsg } = useToastAlert();
/*const elHistory = ref<IHistory>({
    alarma: "",
    fechas: "",
    status: false,
})*/

type IHistory = {
    alarma: string;
    fechas: string;
    status: boolean;
};

// Cambiar `elHistory` para que sea un array de IHistory
const elHistory = ref<IHistory[]>([]); //se cambia de un array de objetos a un array de arrays

const data = ref<string[][]>([]); // Array de arrays para la DataTable

// cuando se carga el componente
onMounted(async () => {
    await elHistorial();
});

const elHistorial = async () => {
    try {
        const resp = await getHistorial();
        if (Array.isArray(resp)) {
            // Mapear los datos para la DataTable
            elHistory.value = resp.map((item) => ({
                alarma: item.alarma,
                fechas: item.fechas,
                status: item.status,
            }));
        } else {
            console.error("La respuesta no es un array:", resp);
        }
        console.log(elHistory.value);
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
        <h5 class="card-title">Aquí puedes buscar alarmas por nombre o por fecha</h5>
        <DataTable :data="elHistory.map(item => [item.alarma, item.fechas, item.status ? 'Se presentó' : 'Se clareó'])"
            class="display table datatable">
            <thead>
                <tr>
                    <th>
                        <b>Alarma </b>
                    </th>
                    <th>fecha</th>
                    <!--<th>Value</th>-->
                    <!--<th data-type="date" data-format="YYYY/DD/MM">Start Date</th>-->
                    <th>presente</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>