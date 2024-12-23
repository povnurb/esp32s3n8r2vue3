<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ReleConfig1 from './components/ReleConfi1.vue';
import ReleConfig2 from './components/ReleConfi2.vue';

const page = 'Relevadores';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Estado', disabled: true, to: '#' },
    { text: 'Relevadores', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!--poner el nombre del import-->
    <section class="section">
        <div class="row">

            <ReleConfig1 />
            <ReleConfig2 />

        </div>
    </section>
    <!---->

</template>