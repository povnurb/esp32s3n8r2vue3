<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
//https://datatables.net/blog/2022/vue
DataTable.use(DataTablesCore);

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