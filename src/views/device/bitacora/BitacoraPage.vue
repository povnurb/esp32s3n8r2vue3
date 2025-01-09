<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import Registro from './components/RegistroBitacora.vue';
import Historial from './components/HistoralBitacora.vue';
import DownloadBitacora from './components/BitacoraDownload.vue';

//--a ver si jalan
import { ref, onMounted } from 'vue';
const componentKey = ref(0);

/*
onMounted(async () => {

    setInterval(actualizar, 2000);

});
*/

//---
const page = 'Bitácora';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Estado', disabled: true, to: '#' },
    { text: 'Bitácora', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- End Page Title -->

    <section class="section">
        <div class="row">
            <!--
                <AlarmasInfo />
                <tu-componente :key="user.id"/>
            -->
            <!--layouts/views/device/alarmas/components-->
            <!--<AlarmasPanel :key="componentKey" />--><!--TODO: quitar por que se ve feo-->
            <Registro />
            <!--tarjeta de descarga de arcihvo de alarmas-->
            <DownloadBitacora />
            <Historial />
            <!--tarjeta de control de alarmas-->
            <!--Historial de alarmas -->
            <!--<HistorialAlarmas />-->
        </div>
    </section>
</template>