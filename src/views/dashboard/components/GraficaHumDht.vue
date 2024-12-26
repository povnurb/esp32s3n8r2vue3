<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref, defineProps } from 'vue';
import { IHdht22 } from '@/interfaces';

//ITEva
const props = defineProps<{
    hdht22: IHdht22
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
        text: 'Humedad relativa %',
        align: 'left'
    },
});

const series = ref<Series[]>([{
    name: 'Humedad:',
    data: [props.hdht22.cH0, props.hdht22.cH1, props.hdht22.cH2, props.hdht22.cH3, props.hdht22.cH4, props.hdht22.cH5, props.hdht22.cH6, props.hdht22.cH7, props.hdht22.cH8, props.hdht22.cH9, props.hdht22.cH10, props.hdht22.cH11, props.hdht22.cH12,
    props.hdht22.cH13, props.hdht22.cH14, props.hdht22.cH15, props.hdht22.cH16, props.hdht22.cH17, props.hdht22.cH18, props.hdht22.cH19, props.hdht22.cH20, props.hdht22.cH21, props.hdht22.cH22
    ]
}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="line" :options="options" :series="series"></VueApexCharts>
    </div>
</template>
