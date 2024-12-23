<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ConfigEtiquetas from './components/ConfigEtiquetas.vue';


const page = 'Etiquetado de alarmas';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Etiquetado de Alarmas', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <section class="section">
        <div class="row">
            <ConfigEtiquetas />
        </div>
    </section>
</template>