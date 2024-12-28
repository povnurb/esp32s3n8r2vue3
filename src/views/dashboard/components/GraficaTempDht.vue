<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITdht22, ItimeM } from '@/interfaces';

//ITEva
const props = defineProps<{
    tdht22: ITdht22
    timeM: ItimeM
}>();


//console.log(props.tEva.tE0);

interface ChartOptions {
    chart: {
        id: string;
        zoom: {
            enabled: false,
        };
    };
    xaxis: {
        categories: number[];
    };
    title: {
        text: string;
        align: string;
    };
    stroke: {
        curve: string;
    };

}

interface Series {
    name: string;
    data: number[];

}

const options = ref<ChartOptions>({
    chart: {
        id: 'vuechart-example',
        zoom: {
            enabled: false,
        },
    },
    xaxis: {
        //categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
        categories: [props.timeM.tm0, props.timeM.tm1, props.timeM.tm2, props.timeM.tm3, props.timeM.tm4, props.timeM.tm5, props.timeM.tm6, props.timeM.tm7, props.timeM.tm8, props.timeM.tm9, props.timeM.tm10, props.timeM.tm11, props.timeM.tm12, props.timeM.tm13, props.timeM.tm14, props.timeM.tm15, props.timeM.tm16, props.timeM.tm17, props.timeM.tm18, props.timeM.tm19, props.timeM.tm20, props.timeM.tm21, props.timeM.tm22,]
    },
    title: {
        text: 'Temperatura en sala (°C)',
        align: 'left'
    },
    stroke: {
        curve: 'smooth'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tdht22.cT0 / 10, props.tdht22.cT1 / 10, props.tdht22.cT2 / 10, props.tdht22.cT3 / 10, props.tdht22.cT4 / 10, props.tdht22.cT5 / 10, props.tdht22.cT6 / 10, props.tdht22.cT7 / 10, props.tdht22.cT8 / 10, props.tdht22.cT9 / 10, props.tdht22.cT10 / 10, props.tdht22.cT11 / 10, props.tdht22.cT12 / 10,
    props.tdht22.cT13 / 10, props.tdht22.cT14 / 10, props.tdht22.cT15 / 10, props.tdht22.cT16 / 10, props.tdht22.cT17 / 10, props.tdht22.cT18 / 10, props.tdht22.cT19 / 10, props.tdht22.cT20 / 10, props.tdht22.cT21 / 10, props.tdht22.cT22 / 10,
    ]

}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" curve="smooth" :options="options" :series="series">
        </VueApexCharts>
    </div>
</template>
