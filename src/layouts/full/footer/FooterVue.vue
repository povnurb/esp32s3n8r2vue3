<script lang="ts" setup>
import { onMounted, ref } from 'vue';

function select(selector: string): HTMLElement | null {
    return document.querySelector(selector);
}

function onscroll(element: Document | HTMLElement, callback: () => void) {
    element.addEventListener('scroll', callback)
}

onMounted(() => {
    const backtotop = select('.back-to-top');
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active');
            } else {
                backtotop.classList.remove('active');
            }
        }
        window.addEventListener('load', toggleBacktotop);
        onscroll(document, toggleBacktotop);
    }
});

const year = ref<number>(new Date().getFullYear());

</script>

<template>
    <!-- ======= Footer ======= -->
    <footer id="footer" class="footer">
        <div class="copyright">
            &copy; {{ year }} <strong><span>IoTMX</span></strong>. Todos los derechos reservados
        </div>
        <div class="credits">
            Diseñado por <a href="https://iotmx.com/" target="_blank" rel="noopener noreferrer">povnurb@hotmail.com</a>
        </div>
    </footer><!-- End Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>
</template>