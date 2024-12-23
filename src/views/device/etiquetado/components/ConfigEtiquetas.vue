<script lang="ts" setup>
import { IAlarmasConfig } from '@/interfaces';
import { ref, onMounted } from 'vue';
import { scanAlarmas, postAlarmConfig } from '@/api/alarms';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore, useSaveStoreAlarma } from '@/store/save';

const saveStore = useSaveStore();
const saveStoreAlarma = useSaveStoreAlarma();

const { toastErrorMsg, toastSuccessMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
//lo que llega por webSocket


const etiquetas = ref<IAlarmasConfig>({

})

// cuando se carga el componente
onMounted(async () => {
    await scanAlarms();
});

let name1: string;
let name2: string;
let name3: string;
let name4: string;
let name5: string;
let name6: string;
let name7: string;
let name8: string;

const scanAlarms = async () => {
    try {
        const resp = await scanAlarmas();
        etiquetas.value = resp;
        name1 = etiquetas.value?.alarmas?.[0].name as string;
        name2 = etiquetas.value?.alarmas?.[1].name as string;
        name3 = etiquetas.value?.alarmas?.[2].name as string;
        name4 = etiquetas.value?.alarmas?.[3].name as string;
        name5 = etiquetas.value?.alarmas?.[4].name as string;
        name6 = etiquetas.value?.alarmas?.[5].name as string;
        name7 = etiquetas.value?.alarmas?.[6].name as string;
        name8 = etiquetas.value?.alarmas?.[7].name as string;
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            saveStoreAlarma.alarmaError();
        }
    }
}

const save = async (): Promise<void> => {
    try {
        const etiquetasPost = ref<IAlarmasConfig>({
            alarmas: [
                { name: name1 }, { name: name2 }, { name: name3 }, { name: name4 }, { name: name5 }, { name: name6 }, { name: name7 }, { name: name8 }
            ]
        })
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción modifica el etiquetado de las alarmas.',
            icon: 'warning'
        });
        if (confirmed) {
            const resp = await postAlarmConfig(etiquetasPost.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los datos.");
                await scanAlarms();
                saveStore.saveSuccess(true);
            }
        }
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

//personas.find(persona => persona.nombre === nombre);
</script>
<template>
    <div class="col-lg-12">

        <div class="card">
            <div class="card-body">
                <!--{{ etiquetas.alarmas?.find(etiqueta => etiqueta.numero === 1)?.name }}
                <br><br>
                {{ etiquetas.alarmas?.findIndex }}
                <br><br>
                {{ etiquetas }}
                <br><br>
                {{ etiquetas.alarmas }}-->
                <form>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma1</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name1">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma2</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name2">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma3</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name3">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma4</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name4">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma5</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name5">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma6</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name6">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma7</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name7">
                    </div>
                    <div>
                        <label for="">Cambiar el etiquetado de la alarma8</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name8">



                    </div>
                    <div class="row mb-3" id="btnSendMqtt"> <!-- btn auto -->
                        <div class="col-sm-10">
                            <button class="btn btn-primary" type="button" @click="save"><i
                                    class="bi bi-floppy me-1"></i>
                                Guardar
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    </div>
</template>