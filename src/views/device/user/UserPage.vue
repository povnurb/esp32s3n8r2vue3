<script lang="ts" setup>
import UserDetails from './components/UserDetails.vue';
import UserPassword from './components/UserPassword.vue';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';

const page = 'Administrador del sistema';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Cambio de contraseña', disabled: true, to: '' },
]
</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <section class="section">
        <div class="row">
            <UserDetails />
            <UserPassword />
        </div>
    </section>
</template>