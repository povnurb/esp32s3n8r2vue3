<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { IHdht22, ItimeM } from '@/interfaces';

//ITEva
const props = defineProps<{
    hdht22: IHdht22
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
        text: 'Humedad relativa (%)',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Humedad:',
    data: [props.hdht22.cH0 / 10, props.hdht22.cH1 / 10, props.hdht22.cH2 / 10, props.hdht22.cH3 / 10, props.hdht22.cH4 / 10, props.hdht22.cH5 / 10, props.hdht22.cH6 / 10, props.hdht22.cH7 / 10, props.hdht22.cH8 / 10, props.hdht22.cH9 / 10, props.hdht22.cH10 / 10, props.hdht22.cH11 / 10, props.hdht22.cH12 / 10,
    props.hdht22.cH13 / 10, props.hdht22.cH14 / 10, props.hdht22.cH15 / 10, props.hdht22.cH16 / 10, props.hdht22.cH17 / 10, props.hdht22.cH18 / 10, props.hdht22.cH19 / 10, props.hdht22.cH20 / 10, props.hdht22.cH21 / 10, props.hdht22.cH22 / 10,
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
