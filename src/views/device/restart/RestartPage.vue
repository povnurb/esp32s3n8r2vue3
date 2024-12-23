<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import CardRestartRestore from '@/components/CardRestartRestore.vue';

const page = 'Reiniciar el dispositivo';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Disposivo', disabled: true, to: '#' },
    { text: 'Reiniciar', disabled: true, to: '' },
]

// datos de la tarjeta
const title = 'Reiniciar';
const subTitle = 'Use este boton para reiniciar el dispositivo';
const buttonIcon = 'arrow-clockwise me-1';
const buttonTitle = 'Reiniciar';
const buttonColor = 'warning';


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