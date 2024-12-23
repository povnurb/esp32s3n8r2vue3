<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { IApiIndexResponseWs } from '@/interfaces';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { useWebsocketsStore } from '@/store/websockets';
import { IAlarmasConfig } from '@/interfaces/alarmas';
import { scanAlarmas } from '@/api/alarms';


const { toastErrorMsg } = useToastAlert();


//lo que llega por webSocket
const websocketsMessage = useWebsocketsStore();//para el index
//habria que copiar uno para para las demas paginas

//scan no importa

const alarmas = ref<IAlarmasConfig>();



// cuando se carga el componente
onMounted(async () => {
    await scanAlarms();
    setInterval(parpadear, 1000);
});
//const cantidadAlarmas = ref(0); //para saber cuantas alarmas existen

const scanAlarms = async () => {
    try {
        const resp = await scanAlarmas();
        alarmas.value = resp;
        //console.log(resp);
        //para saber cuantas alarmas hay
        //cantidadAlarmas.value = alarmas.value?.cantidad;
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
}


watch(
    () => websocketsMessage.message as IApiIndexResponseWs,
    (newMessage) => {
        if (newMessage) {

            alarmas.value = newMessage;

        }
    }

)

// parpadear
const onOff = ref(false);
const parpadear = () => {

    if (onOff.value) {
        onOff.value = false;

    } else {
        onOff.value = true;

    }
}


</script>

<template>
    <div class="col-lg-12">

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">PANEL DE ALARMAS</h5>


                <div id="panel" v-for="{ numero, name, on, off, count } in alarmas?.alarmas" :key="numero">
                    <!--Probando modal-->
                    <!--no hay alarma-->
                    <button type="button"
                        class="col-lg-12 alert alert-light bg-success border-1 alert-dismissible fade show"
                        data-bs-toggle="" :data-bs-target="`#name${numero}`" v-if="off">

                        <h5>
                            <i class="bi bi-info-circle h3 text-white"></i>
                            <span class="badge bg-success text-dark"> {{ name }} </span>
                            <span class="badge bg-light text-dark">{{ count }}</span>
                            <span class="badge bg-danger text-white"> {{ on }} </span>
                            <span class="badge bg-info text-dark">{{ off }} </span>
                        </h5>

                    </button>
                    <a data-bs-toggle="" :data-bs-target="`#name${numero}`" v-else-if="!off && !on">



                    </a>
                    <!--hay alarma-->
                    <button type="button"
                        class="col-lg-12 alert alert-light bg-danger border-1 alert-dismissible fade show"
                        data-bs-toggle="" :data-bs-target="`#name${numero}`" v-else>

                        <h5>


                            <i class="bi bi-exclamation-octagon h3 text-warning" v-if="onOff"></i>
                            <i class="bi bi-exclamation-octagon h3 text-dark" v-else></i>
                            <span class="badge bg-danger text-dark" v-if="onOff">{{ name }}</span>
                            <span class="badge bg-danger text-warning" v-else>{{ name }}</span>
                            <span class="badge bg-light text-dark">{{ count }}</span>
                            <span class="badge bg-danger text-white"> {{ on }} </span>

                            <span class="badge bg-success text-white">{{ off }} </span>
                        </h5>

                    </button>

                </div>

            </div>
        </div>
    </div>
</template>
