<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ConfWhatsApp from './components/ConfigWhatsapp.vue';


const page = 'Configuración del WhatsApp';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Configuración WhatsApp', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <section class="section">
        <div class="row">
            <ConfWhatsApp />
        </div>
        <div class="card">
            <div class="card-title">

                <h1>Instrucciones para obtener la ApiKey desde tu WhatsApp</h1>
            </div>
            <div class="card-body">

                <h3>Primer paso: Añade el número de teléfono +34 621 062 163 a tus contactos del teléfono.</h3>
                <p>
                    Ponle el nombre que desees.
                </p>

                <h3>Segundo paso: Envía el siguiente mensaje</h3>
                <p><strong>I allow callmebot to send me messages</strong>
                </p>
                <p> al nuevo contacto creado (usando tu WhatsApp por supuesto).
                </p>
                <h3>Tercer paso: Espere hasta recibir el mensaje </h3>
                <p>CallMeBot API Activated for *********** (tu numero) Your apikey is: ******* </p>
                <p>Y listo ya podras recibir los mensaje en WhatsApp.</p>
            </div>
        </div>
    </section>
</template>