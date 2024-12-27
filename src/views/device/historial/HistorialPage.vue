<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import HistorialDalarm from './components/HistorialDAlarms.vue';


const page = 'Historial de alarmas';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Historial de Alarmas', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <section class="section">
        <div class="row">
            <HistorialDalarm />
        </div>
    </section>
</template>