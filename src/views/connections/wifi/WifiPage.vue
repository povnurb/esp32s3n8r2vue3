<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ConfigWifi from './components/ConfigWifi.vue';
import ScanWifi from './components/ScanWifi.vue';

const page = 'Configuración de la conexión WiFi';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Conexiones', disabled: true, to: '#' },
    { text: 'WiFi', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <!-- End Page Title -->
    <section class="section">
        <div class="row">
            <ConfigWifi />
            <ScanWifi />
        </div>
    </section>
</template>