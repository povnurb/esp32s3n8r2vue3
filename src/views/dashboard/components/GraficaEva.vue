<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { ITEva, ItimeM } from '@/interfaces';

//ITEva
const props = defineProps<{
    tEva: ITEva
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
        text: 'Temp. Evaporador principal (°C)',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Temperatura:',
    data: [props.tEva.tE0, props.tEva.tE1, props.tEva.tE2, props.tEva.tE3, props.tEva.tE4, props.tEva.tE5, props.tEva.tE6, props.tEva.tE7, props.tEva.tE8, props.tEva.tE9, props.tEva.tE10, props.tEva.tE11, props.tEva.tE12,
    props.tEva.tE13, props.tEva.tE14, props.tEva.tE15, props.tEva.tE16, props.tEva.tE17, props.tEva.tE18, props.tEva.tE19, props.tEva.tE20, props.tEva.tE21, props.tEva.tE22,
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
