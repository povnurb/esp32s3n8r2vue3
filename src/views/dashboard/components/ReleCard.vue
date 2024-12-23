<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { IControl, IOutput } from '@/interfaces';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { postControl } from '@/api/device';

const props = defineProps<{
    outputs: IOutput;
}>();

const { toastErrorMsg, toastInfoMsg } = useToastAlert();
//TODO: name1 name2 y name para el rele verificar esta funcion devuelve un array con lo que contenga lo siguiente
const name = computed(() => {
    return props.outputs?.name;
});
const status = computed(() => {
    return props.outputs?.status;
});
//console.log(status);
//TODO: funsion del control para todo lo demas cambiar nombres etc
const handleToggle = async (name: string, status: boolean) => {
    const data: IControl = {
        protocol: 'API',
        output: `${name}`,
        value: status
    }
    try {
        const resp = await postControl(data);
        if (resp.status) {
            toastInfoMsg(`Toggle: ${resp.output} - ${status ? "ON" : "OFF"}`);
        }
    } catch (error: unknown) {
        //console.log(error)
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
    <!-- automatico -->
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Control de {{ name }} <span>ON/OFF <i class="bi bi-toggles"></i></span></h5>
            <div class="row text-center">
                <div class="col-md-12 pb-2 mb-2">
                    <li class="list-group-item d-flex align-items-center justify-content-between">
                        <h4 class="mt-3">
                            <span class="badge border-primary border-1 text-secondary">
                                {{ name }}
                                <i :class="status ? 'bi bi-alt' : 'bi bi-option'"></i>
                            </span>
                        </h4>
                        <div
                            class="form-check form-switch card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <input :id="name" class="form-check-input" type="checkbox" :checked="!!status"
                                @change="handleToggle(name, ($event.target as HTMLInputElement).checked)">
                        </div>
                        <div class="card-icon rounded-circle d-flex align-items-center">
                            <i :class="['h2', 'bi', 'bi-lightbulb-fill', status ? 'text-warning' : 'text-dark']"></i>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>