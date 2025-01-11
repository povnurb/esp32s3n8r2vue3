<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ConfigTime from './components/ConfigTime.vue';


const page = 'Configuración de fecha y hora';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Fecha y hora', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <section class="section">
        <div class="row">
            <ConfigTime />
        </div>
    </section>
</template>