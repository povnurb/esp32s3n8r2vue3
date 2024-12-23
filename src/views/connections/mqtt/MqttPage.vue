<script lang="ts" setup>
import ConfigMqtt from './components/ConfigMqtt.vue';
import ConfigMqttMessage from './components/ConfigMqttMessage.vue';
import ComandMqtt from './components/ComandMqtt.vue';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';

const page = 'Configuración de la conexión MQTT';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Conexiones', disabled: true, to: '#' },
    { text: 'MQTT', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <section class="section">
        <div class="row">
            <ConfigMqtt />
            <ConfigMqttMessage />
            <ComandMqtt />
        </div>
    </section>
</template>