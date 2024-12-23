<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import CardRestartRestore from '@/components/CardRestartRestore.vue';

const page = 'Restablecer configuraciones predeterminadas';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Restablecer', disabled: true, to: '' },
]

// datos de la tarjeta
const title = 'Restablecer';
const subTitle = 'Use este boton para restablecer las configuraciones a fabrica';
const buttonIcon = 'arrow-counterclockwise me-1';
const buttonTitle = 'Restablecer';
const buttonColor = 'danger';


</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- End Page Title -->
    <section class="section">
        <div class="row">
            <div class="col-lg-12">
                <CardRestartRestore 
                    :title="title" 
                    :subTitle="subTitle" 
                    :buttonIcon="buttonIcon"
                    :buttonTitle="buttonTitle" 
                    :buttonColor="buttonColor"/>
            </div>
        </div>
    </section>
</template>