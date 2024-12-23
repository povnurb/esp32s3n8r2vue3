<script lang="ts" setup>
import { defineProps } from 'vue';

// Definición de las props
const props = defineProps<{
    title: string,
    subtitle?: string,
    color: string,
    icon: string,
    value: string | number,
    valuemin?: string,
    valuemax?: string,
}>();

</script>

<template>
    <!-- Card -->
    <div :class="`card info-card ${props.color}`">
        <div class="card-body">
            <h5 class="card-title text-start">{{ props.title }}</h5>
            <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i :class="`bi bi-${props.icon}`"></i>
                </div>
                <div class="ps-1" v-if="valuemax">
                    <h6 class="text-start ps-0">{{ props.value }}</h6>
                    Temp. Min:<span class="badge bg-info text-dark">{{ props.valuemin }}</span>-Temp. Max:
                    <span class="badge bg-danger text-white">{{ props.valuemax }}</span>
                </div>
                <div class="ps-1" v-else>

                    <h6 class="text-start ps-0">{{ props.value }}</h6>
                    <span class="text-muted small pt-2 ps-0">{{ props.subtitle }}</span>
                </div>

            </div>

        </div>
    </div>
</template>