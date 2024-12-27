<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import { getHistorial } from '@/api/alarms';
import useToastAlert from '@/composables/useToastAlert';
import { ref, defineProps, onMounted } from 'vue';
import { IHistory } from '@/interfaces/infoDashboard';
import { isErrorResponse } from '@/utils/utils';
//https://datatables.net/blog/2022/vue
DataTable.use(DataTablesCore);
const { toastErrorMsg } = useToastAlert();
const elHistory = ref<IHistory>({
    alarma: "",
    fechas: "",
    status: false,
})

// cuando se carga el componente
onMounted(async () => {
    await elHistorial();
});

const elHistorial = async () => {
    try {
        const resp = await getHistorial();
        elHistory.value = resp;

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

/*
const props = defineProps<{
    historial: ITCond
    timeM: ItimeM
}>();
*/
/**
 * IHistory
 */



const data = [
    ['{"protocol":"MQTT","output":"RELAY1","value":true}'],
    ['{"protocol":"MQTT","output":"DeviceName","value":"Petrolera_PTTI1"}'],

];
</script>

<template>
    <div class="col-lg-12 card ">
        <h5 class="card-title">Historial de alarmas</h5>
        <DataTable :data="data" class="display table datatable">
            <thead>
                <tr>
                    <th>
                        <b>Alarmas: </b>
                    </th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>