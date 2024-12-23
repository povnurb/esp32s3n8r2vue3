<script lang="ts" setup>
import { IControl } from '@/interfaces';
import { postControl } from '@/api/device';
import useToastAlert from '@/composables/useToastAlert';
import { isErrorResponse } from '@/utils/utils';
import { ref } from 'vue';


const { toastErrorMsg, toastInfoMsg } = useToastAlert();
const action = ref({
    RELAY_STATUS: false,
    RELAY_LOGICA: 0,
    RELAY_PIN: 15,  //relevador 33
    RELAY_NAME: "RELAY 01",
    RELAY_DESCRIPTION: "El siguiente switch activa todas las Alarmas"
})
//import useApp from "@/composables/useApp"
//import { ref, computed, onMounted } from 'vue'

//TODO: funsion del control para todo lo demas cambiar nombres etc
const handleToggle = async (status: boolean) => {
    const data: IControl = {
        protocol: 'API',
        output: 'prueba_de_alarmas',
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
    <div class="card col-md-6 col-xl-6">
        <h5 class="card-title text-center">
            Control Remoto de alarmas
        </h5>
        <div class="card-body items-center text-center">
            <label class="col-sm-12 col-form-label mt-3" for="fileAlarmas">
                {{ action.RELAY_DESCRIPTION }}</label>

            <div class=" item form-switch">
                <!--<input class="form-check-input" type="checkbox" v-model="action.RELAY_STATUS" @click="relayOnOff">-->
                <input class="form-check-input item" type="checkbox" id="activarAlarmas" name="activarAlarmas"
                    v-model="action.RELAY_STATUS" @change="handleToggle(($event.target as HTMLInputElement).checked)">
                <label class="form-check-label" for="activarAlarmas">
                    {{ action.RELAY_STATUS ? 'Estatus: Activadas' : ' Estatus: Desactivadas' }}
                </label>
            </div>

            <div class="item">
                <!--<i :class="icon_class"></i>-->
                <i v-if="action.RELAY_STATUS" class="bi bi-lightbulb-fill text-danger h2"></i>
                <i v-else class="bi bi-lightbulb-fill text-dark h2"></i>
            </div>

        </div>
    </div>


</template>
