<script lang="ts" setup>
import { ref } from 'vue';
const year = ref<number>(new Date().getFullYear());
</script>
<template>
    <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>¡La página que buscas no existe.</h2>
        <RouterLink class="btn" :to="{ name: 'Dashboard' }">Regresar</RouterLink>
        <div class="credits mt-3">
            <div class="copyright">
                &copy; {{ year }} <strong><span>IoTMX</span></strong>. Todos los derechos reservados
            </div>
            <div class="credits">
                Diseñado por <a href="https://iotmx.com/" target="_blank"
                    rel="noopener noreferrer">povnurb@hotmail.com</a>
            </div>
        </div>
    </section>
</template>