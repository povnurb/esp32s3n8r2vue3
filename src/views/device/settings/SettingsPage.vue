<script lang="ts" setup>
import FirmwareConfig from './components/FirmwareConfig.vue';
import SettingsConfig from './components/SettingsConfig.vue';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';

const page = 'Configuración del Firmware y settings.json';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Configuración', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <section class="section">
        <div class="row">
            <FirmwareConfig/>
            <SettingsConfig/>
        </div>
    </section>
</template>