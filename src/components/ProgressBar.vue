<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: String,
    percentage: {
        type: Number,
        default: 0
    }
});

// calcular el estilo de la barra de progreso
const progressBarStyle = computed(() => ({
    width: `${props.percentage ?? 0}%`
}));

// mostrar u oocultar el progressbar
const shouldShow = computed(() => (props.percentage ?? 0) > 0);

</script>

<template>
    <!--el restoreLoading solo se va a dibujar si el v-if es verdadero-->
    <div class="restoreLoading" v-if="shouldShow">
        <h5 class="card-title mt-2">{{ props.title }}</h5>
        <div class="progress">
            <div class="progress-bar progress-bar-striped bg-secondary progress-bar-animated" :style="progressBarStyle"
                id="progressRestore">{{ props.percentage }}%</div>

        </div>
        <h3 class="card-title">Espere, regresando a página principal ...</h3>
    </div>
</template>