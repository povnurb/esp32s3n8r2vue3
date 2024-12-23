<script lang="ts" setup>
import { defineProps } from 'vue';
import { IApiIndexResponse, IDeviceInfo } from '@/interfaces';
import ConnectionsInfoCard from './ConnectionsInfoCard.vue';

const props = defineProps<{
    data: IApiIndexResponse

}>();

// Mapa para relacionar los nombres de los encabezados con las propiedades del objeto info
const infoKeysMap: Record<string, keyof IDeviceInfo> = {
    "Serie": "device_serial",
    "Tarjeta": "device_name",
    "Identificador": "device_id",
    "mDNS": "device_mdns",
    "Firmware ver.": "device_firmware",
    "Hardware ver.": "device_hardware",
    "Fabricante": "device_manufacture",
    "CPU (MHz)": "device_frequency",
    "RAM (KB)": "device_ram",
    "RAM libre (KB)": "ram_available",
    "SPIFFS (KB)": "device_spiffs",
    "SPIFFS usada (KB)": "spiffs_used",
    "FLASH (MB)": "device_flash",
    "Tiempo activo": "device_time",
    "Reinicios": "device_restart"
};

</script>

<template>
    <div class="col-lg-8">
        <div class="row">
            <!--Inalambrico-->
            <ConnectionsInfoCard :connection="props.data?.wifi" />
            <!--broker mqtt-->
            <ConnectionsInfoCard :connection="props.data?.mqtt" />
            <!--deviceInfo-->
            <div class="col-lg-12">
                <!-- Automatico -->
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Información General<span> | Dispositivo</span></h5>
                        <div class="table-responsive">
                            <table class="table table-borderless datatable align-middle">
                                <tbody id="infoTable">
                                    <tr v-for="(value, key) in infoKeysMap" :key="key">
                                        <th scope="row" class="w-25">{{ key }}</th>
                                        <td class="w-75">{{ props.data.info[value] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div><!-- End informacion general -->

        </div>

    </div>

</template>