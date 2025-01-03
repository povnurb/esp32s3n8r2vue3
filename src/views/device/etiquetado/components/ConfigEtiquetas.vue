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
let reconocer1: boolean;
let name2: string;
let reconocer2: boolean;
let name3: string;
let reconocer3: boolean;
let name4: string;
let reconocer4: boolean;
let name5: string;
let reconocer5: boolean;
let name6: string;
let reconocer6: boolean;
let name7: string;
let reconocer7: boolean;
let name8: string;
let reconocer8: boolean;

const scanAlarms = async () => {
    try {
        const resp = await scanAlarmas();
        etiquetas.value = resp;
        name1 = etiquetas.value?.alarmas?.[0].name as string;
        reconocer1 = etiquetas.value?.alarmas?.[0].reconocida as boolean;
        name2 = etiquetas.value?.alarmas?.[1].name as string;
        reconocer2 = etiquetas.value?.alarmas?.[1].reconocida as boolean;
        name3 = etiquetas.value?.alarmas?.[2].name as string;
        reconocer3 = etiquetas.value?.alarmas?.[2].reconocida as boolean;
        name4 = etiquetas.value?.alarmas?.[3].name as string;
        reconocer4 = etiquetas.value?.alarmas?.[3].reconocida as boolean;
        name5 = etiquetas.value?.alarmas?.[4].name as string;
        reconocer5 = etiquetas.value?.alarmas?.[4].reconocida as boolean;
        name6 = etiquetas.value?.alarmas?.[5].name as string;
        reconocer6 = etiquetas.value?.alarmas?.[5].reconocida as boolean;
        name7 = etiquetas.value?.alarmas?.[6].name as string;
        reconocer7 = etiquetas.value?.alarmas?.[6].reconocida as boolean;
        name8 = etiquetas.value?.alarmas?.[7].name as string;
        reconocer8 = etiquetas.value?.alarmas?.[7].reconocida as boolean;
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
                { name: name1, reconocida: reconocer1 }, { name: name2, reconocida: reconocer2 },
                { name: name3, reconocida: reconocer3 }, { name: name4, reconocida: reconocer4 },
                { name: name5, reconocida: reconocer5 }, { name: name6, reconocida: reconocer6 },
                { name: name7, reconocida: reconocer7 }, { name: name8, reconocida: reconocer8 }
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

                <form>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #1</label>
                        <input class="col-6" type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name1">
                        <label class="col-6 col-form-label" for="alrm1">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm1" name="alrm1"
                                v-model="reconocer1">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #2</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name2">
                        <label class="col-6 col-form-label" for="alrm2">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm2" name="alrm2"
                                v-model="reconocer2">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #3</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name3">
                        <label class="col-6 col-form-label" for="alrm3">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm3" name="alrm3"
                                v-model="reconocer3">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #4</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name4">
                        <label class="col-6 col-form-label" for="alrm4">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm4" name="alrm4"
                                v-model="reconocer4">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #5</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name5">
                        <label class="col-6 col-form-label" for="alrm5">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm5" name="alrm5"
                                v-model="reconocer5">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #6</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name6">
                        <label class="col-6 col-form-label" for="alrm6">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm6" name="alrm6"
                                v-model="reconocer6">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #7</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name7">
                        <label class="col-6 col-form-label" for="alrm7">¿Registrar alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm7" name="alrm7"
                                v-model="reconocer7">
                        </div>
                    </div>
                    <hr>
                    <div class="row col-12">
                        <label for="">Cambiar el etiquetado de la alarma #8</label>
                        <input type="text" :class="`alarma1 form-control`"
                            :placeholder="`${etiquetas.alarmas?.[0].name} `" v-model="name8">
                        <label class="col-6 col-form-label" for="alrm8">¿Registrar Alarma y avisar por Telegram?</label>
                        <div class="col-2 form-check form-switch" style="padding: 7px 50px;">
                            <input class="relay1 form-check-input" type="checkbox" id="alrm8" name="alrm8"
                                v-model="reconocer8">
                        </div>



                    </div>
                    <hr>
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