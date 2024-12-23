<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { IApiIndexResponse } from '@/interfaces';
import ProgressBarInfo from './ProgressBarInfo.vue';

const props = defineProps<{
    data: IApiIndexResponse;
}>();


const spiffsUsagePercentage = computed(() => {
    const max = props.data.info.device_spiffs;
    const used = props.data.info.spiffs_used;
    // verificación de validos
    if (max === undefined || used === undefined || max === 0) {
        return 0;
    }
    // realizamos el calculo
    const percentage = (used / max) * 100;
    return parseFloat(percentage.toFixed(2));
});

const ramFreePercentage = computed(() => {
    const max = props.data.info.device_ram;
    const free = props.data.info.ram_available;
    // verificación de validos
    if (max === undefined || free === undefined || max === 0) {
        return 0;
    }
    // realizamos el calculo
    const percentage = (free / max) * 100;
    return parseFloat(percentage.toFixed(2));
});


</script>

<template>
    <div class="col-lg-4">
        <div class="row">
            <div class="col-xxl-12">
                <div class="card info-card revenue-card">
                    <div class="card-body">
                        <h5 class="card-title text-start">Estados <span>| WIFI/SPIFFS/RAM</span></h5>
                        <li class="list-group-item align-items-center justify-content-between">
                            <!-- progress wifi -->
                            <ProgressBarInfo :title="`Calidad red WiFi (${props.data.info.wifi_quality}%)`"
                                :percentage="props.data.info.wifi_quality" color="success" />
                            <!-- progress spiffs -->
                            <ProgressBarInfo :title="`Almacenamiento usado de la capacidad (${spiffsUsagePercentage})%`"
                                :percentage="spiffsUsagePercentage" color="secondary" />
                            <!-- progress ram -->
                            <ProgressBarInfo :title="`RAM disponible (${ramFreePercentage})%`"
                                :percentage="ramFreePercentage" color="info" />
                        </li>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>