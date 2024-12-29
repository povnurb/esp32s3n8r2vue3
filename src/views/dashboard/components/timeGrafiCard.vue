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
    //lo que tenga como nombre tgrafica lo captura
    return props.outputs?.filter(output => output.name.includes('tgrafica'));
});

// esta funcion manda toda la informacion qu deseamos cambiar
// como por ejemplo reconocer alarmas y cambiar los nombres
const handleRangeChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const data: IControl = {
        protocol: 'API',
        output: `TIMEGRAFICA`,
        value: parseInt(target.value)
    }
    try {
        const resp = await postControl(data);
        if (resp.status) {
            toastInfoMsg(`Tiempo de muestreo en ${target.value} Minutos`);
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
                <h5 class="card-title text-start"> Tiempo de muestreo para las graficas</h5>
                <!-- progress automatico -->

                <div class="mt-3">
                    <label class="form-label" v-if="output.status == 1"><span>cada {{ output.status }}
                            Minuto</span></label>
                    <label class="form-label" v-else><span>cada {{ output.status }} Minutos</span></label>
                    <input type="range" class="form-range" :id="output.name" min="1" max="30" step="1"
                        :value="output.status" @change="handleRangeChange">
                </div>
            </li>
        </div>
    </div>
</template>