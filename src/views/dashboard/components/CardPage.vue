<script lang="ts" setup>
import { defineProps } from 'vue';
import DashboardCard from './DashboardCard.vue';
import { IDeviceInfo } from '@/interfaces/infoDashboard';

const props = defineProps<{
    info: IDeviceInfo
}>();

</script>

<template>

    <!-- Card de la ubicación del dispositivo 
    <div class="col-xxl-3 col-md-6" v-if="info">
        <DashboardCard title="Sala" subtitle="Lugar donde se encuentra instalado el dispositivo" color="sales-card"
            icon="geo-alt-fill" size="100px" :value="props.info.sala.toUpperCase()" />
    </div>End Card de la ubicación del dispositivo -->
    <!-- Card de la temperatura de la sala -->
    <div class="col-xxl-3 col-md-4" v-if="info">
        <!-- card -->
        <DashboardCard title="Temperatura en sala" color="sales-card" icon="thermometer-half"
            :value="props.info.tcdht22" :valuemin="props.info.tmin" :valuemax="props.info.tmax" />
    </div><!-- End Card de la temperatura de la sala -->
    <!-- Card de la temperatura del evaporador -->
    <div class="col-xxl-3 col-md-4" v-if="info">
        <!-- Temp evaporavor -->
        <DashboardCard title="Temperatura del evaporavor" subtitle="Indica la temperatura actual evaporavor"
            color="sales-card" icon="thermometer-snow" :value="props.info.tempEvaporador" />
    </div><!-- End Temp evaporavor Card -->
    <div class="col-xxl-3 col-md-4" v-if="info">
        <!-- tiempo de actividad -->
        <DashboardCard title="Temperatura del condensador" subtitle="Indica la temperatura del condensador"
            color="customers-card" icon="thermometer-sun" :value="props.info.tempCondensador" />
    </div><!-- End tiempo de actividad Card -->
</template>