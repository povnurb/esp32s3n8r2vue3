<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
//import AlarmasInfo from './components/AlarmasInfo.vue';
//importar la pagina de vue
import AlarmasPanel from './components/AlarmasPanel.vue';
//importar el componente para activar alarmas
import AlarmasControl from './components/AlarmasControl.vue';
//importar el componente para descargar alarmas
import AlarmasDownload from './components/AlarmasDownload.vue';
//importar componente para el historia de alamas
//import HistorialAlarmas from './components/HistorialAlarmas.vue';

//--a ver si jalan
import { ref, onMounted } from 'vue';
const componentKey = ref(0);

onMounted(async () => {

    setInterval(actualizar, 2000);

});

const actualizar = () => {

    if (componentKey.value) {
        componentKey.value += 1;

    } else {
        componentKey.value -= 1;

    }
}

//---
const page = 'Alarmas';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Estado', disabled: true, to: '#' },
    { text: 'Alarmas', disabled: true, to: '' },
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
            <AlarmasPanel />
            <!--tarjeta de descarga de arcihvo de alarmas-->
            <AlarmasDownload />
            <!--tarjeta de control de alarmas-->
            <AlarmasControl />
            <!--Historial de alarmas -->
            <!--<HistorialAlarmas />-->
        </div>
    </section>
</template>