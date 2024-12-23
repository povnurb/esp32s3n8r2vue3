<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITdht22 } from '@/interfaces';

//ITEva
const props = defineProps<{
    tdht22: ITdht22
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
        text: 'Temperatura en sala °C',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tdht22.cT0, props.tdht22.cT1, props.tdht22.cT2, props.tdht22.cT3, props.tdht22.cT4, props.tdht22.cT5, props.tdht22.cT6, props.tdht22.cT7, props.tdht22.cT8, props.tdht22.cT9, props.tdht22.cT10, props.tdht22.cT11, props.tdht22.cT12,
    props.tdht22.cT13, props.tdht22.cT14, props.tdht22.cT15, props.tdht22.cT16, props.tdht22.cT17, props.tdht22.cT18, props.tdht22.cT19, props.tdht22.cT20, props.tdht22.cT21, props.tdht22.cT22, props.tdht22.cT23
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="area" :options="options" :series="series">
        </VueApexCharts>
    </div>
</template>
