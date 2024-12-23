<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { IControl, IOutput } from '@/interfaces';
import ProgressBarInfo from './ProgressBarInfo.vue';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { postControl } from '@/api/device';

const props = defineProps<{
    outputs: IOutput[];
}>();

const { toastErrorMsg, toastInfoMsg } = useToastAlert();
//regresa un array con todos los objetos que tengan DIMMER incluido en su name
const filteredDimmerOutputs = computed(() => {
    return props.outputs?.filter(output => output.name.includes('DIMMER'));
});

// esta funcion manda toda la informacion qu deseamos cambiar
// como por ejemplo reconocer alarmas y cambiar los nombres
const handleRangeChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const data: IControl = {
        protocol: 'API',
        output: `${target.id}`,
        value: parseInt(target.value)
    }
    try {
        const resp = await postControl(data);
        if (resp.status) {
            toastInfoMsg(`Dimmer: ${resp.output} - al ${target.value} %`);
        }
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response.data.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
}

</script>

<template>
    <div class="card info-card revenue-card" v-for="output in filteredDimmerOutputs" :key="output.name">
        <div class="card-body">
            <li class="list-group-item align-items-center justify-content-between">
                <h5 class="card-title text-start">Dimmer <span>| Regulación en (%)</span></h5>
                <!-- progress automatico -->
                <ProgressBarInfo title=""
                    :percentage="typeof output.status === 'boolean' ? (output.status ? 100 : 0) : output.status"
                    color="primary" />
                <div class="mt-3">
                    <label class="form-label"><span>Regulador ({{ output.status }})%</span></label>
                    <input type="range" class="form-range" :id="output.name" min="0" max="100" step="1"
                        :value="output.status" @change="handleRangeChange">
                </div>
            </li>
        </div>
    </div>
</template>