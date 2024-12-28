<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITCond, ItimeM } from '@/interfaces';

//ITEva
const props = defineProps<{
    tCon: ITCond
    timeM: ItimeM
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
        categories: [props.timeM.tm0, props.timeM.tm1, props.timeM.tm2, props.timeM.tm3, props.timeM.tm4, props.timeM.tm5, props.timeM.tm6, props.timeM.tm7, props.timeM.tm8, props.timeM.tm9, props.timeM.tm10, props.timeM.tm11, props.timeM.tm12, props.timeM.tm13, props.timeM.tm14, props.timeM.tm15, props.timeM.tm16, props.timeM.tm17, props.timeM.tm18, props.timeM.tm19, props.timeM.tm20, props.timeM.tm21, props.timeM.tm22,]
    },
    title: {
        text: 'Temp. Evaporador respaldo (°C)',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tCon.tC0, props.tCon.tC1, props.tCon.tC2, props.tCon.tC3, props.tCon.tC4, props.tCon.tC5, props.tCon.tC6, props.tCon.tC7, props.tCon.tC8, props.tCon.tC9, props.tCon.tC10, props.tCon.tC11, props.tCon.tC12,
    props.tCon.tC13, props.tCon.tC14, props.tCon.tC15, props.tCon.tC16, props.tCon.tC17, props.tCon.tC18, props.tCon.tC19, props.tCon.tC20, props.tCon.tC21, props.tCon.tC22,
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
