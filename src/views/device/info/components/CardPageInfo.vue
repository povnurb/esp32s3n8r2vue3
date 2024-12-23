<script lang="ts" setup>
import { defineProps } from 'vue';
import InfoCard from './InfoCard.vue';
import { IDeviceInfo } from '@/interfaces/infoDashboard';

const props = defineProps<{
    info: IDeviceInfo
}>();

</script>

<template>

    <!-- Serial Card -->
    <div class="col-xxl-3 col-md-6" v-if="info">
        <!-- card -->
        <InfoCard title="Numero de serie" subtitle="Numero de serie del equipo" color="dark-card" icon="upc-scan"
            size="100px" :value="props.info.device_serial" />
    </div><!-- End serial Card -->
    <!-- dispositivo Card -->
    <div class="col-xxl-3 col-md-6" v-if="info">
        <!-- card -->
        <InfoCard title="Nombre" subtitle="Nombre del dispositivo" color="sales-card" icon="info-circle"
            :value="props.info.device_name.toUpperCase()" />
    </div><!-- End dispositivo Card -->
    <!-- Serial Card -->
    <div class="col-xxl-3 col-md-6" v-if="info">
        <!-- reinicios -->
        <InfoCard title="Reinicios" subtitle="Contador de reinicios" color="customers-card" icon="arrow-clockwise"
            :value="props.info.device_restart" />
    </div><!-- End reinicios Card -->
    <div class="col-xxl-3 col-md-6" v-if="info">
        <!-- tiempo de actividad -->
        <InfoCard title="Tiempo activo" subtitle="(Dias:Horas:Min:Seg)" color="revenue-card" icon="clock-history"
            :value="props.info.device_time" />
    </div><!-- End tiempo de actividad Card -->
</template>