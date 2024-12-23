<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    title: String,
    percentage: {
        type: Number,
        default: 0 // Valor predeterminado para evitar undefined
    },
    color: {
        type: String,
        default: 'primary' // Valor predeterminado para evitar undefined
    }
});

const progressBarStyle = computed(() => ({
    width: `${props.percentage ?? 0}%`
}));

</script>

<template>
    <h5 class="text-start">{{ props.title }}</h5>
    <div class="progress mt-3 mb-3" style="height: 25px">
        <div :class="`progress-bar bg-${props.color}`" :style="progressBarStyle">
            <strong>
                <span id="ramAvailableSpan" class="text-white" style="font-size: 15px">
                    {{ props.percentage }}%
                </span>
            </strong>
        </div>
    </div>
</template>