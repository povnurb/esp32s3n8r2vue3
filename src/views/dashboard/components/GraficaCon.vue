<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITCond } from '@/interfaces';

//ITEva
const props = defineProps<{
    tCon: ITCond
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
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    title: {
        text: 'Temperatura del condensador °C',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tCon.tC0, props.tCon.tC1, props.tCon.tC2, props.tCon.tC3, props.tCon.tC4, props.tCon.tC5, props.tCon.tC6, props.tCon.tC7, props.tCon.tC8, props.tCon.tC9, props.tCon.tC10, props.tCon.tC11, props.tCon.tC12,
    props.tCon.tC13, props.tCon.tC14, props.tCon.tC15, props.tCon.tC16, props.tCon.tC17, props.tCon.tC18, props.tCon.tC19, props.tCon.tC20, props.tCon.tC21, props.tCon.tC22
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
