<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITEva } from '@/interfaces';

//ITEva
const props = defineProps<{
    tEva: ITEva
}>();


//console.log(props.tEva.tE0);

interface ChartOptions {
    chart: {
        id: string;
    };
    xaxis: {
        categories: number[];
    };
    title: {
        text: string;
        align: 'left';
    };

}

interface Series {
    name: string;
    data: number[];
}

const options = ref<ChartOptions>({
    chart: {
        id: 'vuechart-example'
    },
    xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    },
    title: {
        text: 'Temperatura Evaporador °C',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tEva.tE0, props.tEva.tE1, props.tEva.tE2, props.tEva.tE3, props.tEva.tE4, props.tEva.tE5, props.tEva.tE6, props.tEva.tE7, props.tEva.tE8, props.tEva.tE9, props.tEva.tE10, props.tEva.tE11, props.tEva.tE12,
    props.tEva.tE13, props.tEva.tE14, props.tEva.tE15, props.tEva.tE16, props.tEva.tE17, props.tEva.tE18, props.tEva.tE19, props.tEva.tE20, props.tEva.tE21, props.tEva.tE22, props.tEva.tE23
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
