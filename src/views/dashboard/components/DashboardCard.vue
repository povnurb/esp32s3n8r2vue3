<script lang="ts" setup>
import { defineProps, onMounted, ref } from 'vue';

onMounted(async () => {

    setInterval(parpadear, 1000);
});

// Definición de las props
const props = defineProps<{
    title: string,
    subtitle?: string,
    color: string,
    icon: string,
    value: number,
    valuemin?: number | string,
    valuemax?: number | string,
    parpadear: string | boolean,
}>();

// parpadear
const onOff = ref(false);
const parpadear = () => {

    if (props.parpadear == "true") {
        if (onOff.value) {
            onOff.value = false;

        } else {
            onOff.value = true;

        }
    } else {
        onOff.value = false;
    }

}


</script>

<template>
    <!-- Card -->
    <div :class="`card info-card ${props.color}`">
        <div class="card-body">
            <h5 class="card-title text-start">{{ props.title }}</h5>
            <div class="d-flex align-items-center">
                <div class="card-icon rounded-circle d-flex bg-danger align-items-center justify-content-center"
                    v-if="onOff && props.value >= 30">

                    <i :class="`bi bi-${props.icon} text-warning`"></i>
                </div>
                <div class="card-icon rounded-circle d-flex align-items-center justify-content-center" v-else>

                    <i :class="`bi bi-${props.icon} `"></i>
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