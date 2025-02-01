<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import Registro from './components/RegistroBitacora.vue';
import Historial from './components/HistoralBitacora.vue';
import DownloadBitacora from './components/BitacoraDownload.vue';
import { ref } from 'vue';

// Referencia al componente Historial
const historialRef = ref();

const page = 'Bitácora';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Estado', disabled: true, to: '#' },
    { text: 'Bitácora', disabled: true, to: '' },
]

// Función para actualizar el historial
const actualizarHistorial = () => {
    console.log('Actualizando historial...');
    if (historialRef.value && typeof historialRef.value.recargar === 'function') {
        historialRef.value.recargar();
    }
};

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- End Page Title -->

    <section class="section">
        <div class="row">

            <code>Ejemplos: Mantenimientos a G.E, hrs trabajadas, restauraciones, suministro de diesel, mantenimientos a Climas, cambios de tarjetas, daños en general e instalaciones de equipos nuevos.  </code>

            <Registro @actualizar-historial="actualizarHistorial" />
            <DownloadBitacora />
            <Historial ref="historialRef" />

        </div>
    </section>
</template>