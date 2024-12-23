<script lang="ts" setup>
import VueApexCharts from 'vue3-apexcharts';
import { ref } from 'vue';

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
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    },
    title: {
        text: 'Temperatura en sala °C',
        align: 'left'
    },
});

const series = ref<Series[]>([{

    name: 'series1',
    data: [31, 40, 28, 51, 42, 109, 100]
}, {
    name: 'series2',
    data: [11, 32, 45, 32, 34, 52, 41]

}]);

</script>

<template>
    <div class="card">
        <VueApexCharts width="100%" type="area" :options="options" :series="series">
        </VueApexCharts>
    </div>
</template>
