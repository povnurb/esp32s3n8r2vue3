<script lang="ts" setup>
import { IRelaysConfig1 } from '@/interfaces';
import { ref, onMounted } from 'vue';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { isErrorResponse } from '@/utils/utils';
import { useSaveStore } from '@/store/save';
import { getRelaysConfig1, postRelaysConfig1 } from '@/api/relays';

//definiciones
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();


//TODO: 
const relay1 = ref<IRelaysConfig1>(
    {
        STATUS1: false,
        R_NAME1: '',
        R_DESCRIPTION1: '',
        R_TIMERON1: false,
        R_TIMER1: 0,
        TEMPORIZADOR1: false,
        DOMINGO1A: false,
        LUNES1A: false,
        MARTES1A: false,
        MIERCOLES1A: false,
        JUEVES1A: false,
        VIERNES1A: false,
        SABADO1A: false,
        TIMEONRELAY1A: '',
        TIMEOFFRELAY1A: '',
        DOMINGO1B: false,
        LUNES1B: false,
        MARTES1B: false,
        MIERCOLES1B: false,
        JUEVES1B: false,
        VIERNES1B: false,
        SABADO1B: false,
        TIMEONRELAY1B: '',
        TIMEOFFRELAY1B: '',
        FECHAON1: '',
        FECHAOFF1: '',
        PROGRAMADO1: false,
    }
)

onMounted(async () => {
    await getData();
});

const getData = async () => {
    try {
        const resp = await getRelaysConfig1();
        console.log(relay1.value.FECHAON1);
        relay1.value = resp.RELAY1;
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

const save = async (): Promise<void> => {
    try {
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción actualizará los parámetros de configuración de los relevadores del dispositivo.',
            icon: 'warning'
        });
        if (confirmed) {
            console.log(relay1.value);
            const resp = await postRelaysConfig1(relay1.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los valores de configuración del Relay1");
                await getData();
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

</script>

<template>

    <div class="col-lg-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Configuración del Relay 1(D17) <i id="RELAY01_Status"
                        class="bi bi-lightbulb-fill text-warning" v-if="relay1.STATUS1"></i>
                    <i id="RELAY01_Status" class="bi bi-lightbulb-fill text-dark" v-else></i>
                </h5>

                <!-- Advanced Form Elements -->
                <form>
                    <div class="row mb-5">
                        <label class="col-sm-2 col-form-label" for="relay1_activar">Relay1</label>

                        <div class="col-sm-10">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="relay1_activar"
                                    name="relay1_activar" v-model="relay1.STATUS1">
                                <label class="form-check-label" for="relay1_activar">{{ relay1.STATUS1 ?
                                    'ON' : 'OFF' }}</label>
                            </div>

                        </div>

                    </div>
                    <hr>
                    <div class="row mb-3">
                        <label for="relay1_name" class="col-sm-4 col-form-label">Nombre:</label>
                        <div class="col-sm-8">
                            <input type="text" class="relay1 form-control" placeholder="Relay1" id="relay1_name"
                                name="relay1_name" v-model="relay1.R_NAME1">
                        </div>
                        <!-- auto - input nombre Nota: No PUEDEN LLEVAR punto ni espacio-->
                        <span class="badge bg-warning text-dark">Nota: Usar nombre corto y sin espacio</span>
                    </div>
                    <div>
                        <label for="relay1_descripcion" class="col-sm-3 col-form-label">Descripción:</label>
                        <div class="col-sm-12">
                            <input type="text" class="relay1 form-control" placeholder="ejemplo: Control de motor"
                                id="relay1_descripcion" name="relay1_descripcion" v-model="relay1.R_DESCRIPTION1">
                        </div>
                        <!-- auto - input descripción -->
                    </div>
                    <div class="row mb-3 mt-3">

                        <label style="background-color: rgb(173, 231, 197);" for="relay1_timer"
                            class="col-sm-4 col-form-label">Timer</label>

                        <div style="background-color: rgb(173, 231, 197);" class="col-sm-8">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="relay1_timer"
                                    name="relay1_timer" v-model="relay1.R_TIMERON1">
                                <label class="form-check-label" for="relay1_timer">{{ relay1.R_TIMERON1 ? 'ON'
                                    : 'OFF' }}</label>

                                <input type="number" min="1" max="3600" id="relay1_segundos" name="relay1_segundos"
                                    class="relay1 form-control col-sm-2" v-model="relay1.R_TIMER1"
                                    :disabled="!relay1.R_TIMERON1">

                            </div>
                        </div>
                        <span class="badge bg-info text-dark">Activa el relevador de 1 hasta 3600
                            seg.(1hr)</span>
                        <hr>
                        <label for="relay1_temporizador" style="background-color: rgb(173, 231, 197);"
                            class="col-sm-4 col-form-label">Temporizador</label>

                        <div style="background-color: rgb(173, 231, 197);" class="col-sm-8">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="relay1_temporizador"
                                    name="relay1_temporizador" v-model="relay1.TEMPORIZADOR1">
                                <label class="form-check-label" for="flexSwitchCheckDefault">{{
                                    relay1.TEMPORIZADOR1 ? 'ON' : 'OFF' }}</label>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_tiempoOnA" class="col-sm-4 col-form-label">Encender</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay1 form-control" id="relay1_tiempoOnA"
                                        name="relay1_tiempoOnA" v-model="relay1.TIMEONRELAY1A"
                                        :disabled="!relay1.TEMPORIZADOR1">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_tiempoOffA" class="col-sm-4 col-form-label">Apagar</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay1 form-control" id="relay1_tiempoOffA"
                                        name="relay1_tiempoOffA" v-model="relay1.TIMEOFFRELAY1A"
                                        :disabled="!relay1.TEMPORIZADOR1">
                                </div>
                            </div>
                        </div>

                        <table class="col-xxl-3 col-md-12">
                            <thead>
                                <tr>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>M</th>
                                    <th>M</th>
                                    <th>J</th>
                                    <th>V</th>
                                    <th>S</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1ADO"
                                            name="relay1_1ADO" v-model="relay1.DOMINGO1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1ALU"
                                            name="relay1_1ALU" v-model="relay1.LUNES1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1AMA"
                                            name="relay1_1AMA" v-model="relay1.MARTES1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1AMI"
                                            name="relay1_1AMI" v-model="relay1.MIERCOLES1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1AJU"
                                            name="relay1_1AJU" v-model="relay1.JUEVES1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1AVI"
                                            name="relay1_1AVI" v-model="relay1.VIERNES1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1ASA"
                                            name="relay1_1ASA" v-model="relay1.SABADO1A"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <hr>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_tiempoOnB" class="col-sm-4 col-form-label">Encender</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay1 form-control" id="relay1_tiempoOnB"
                                        name="relay1_tiempoOnB" v-model="relay1.TIMEONRELAY1B"
                                        :disabled="!relay1.TEMPORIZADOR1">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_tiempoOffB" class="col-sm-4 col-form-label">Apagar</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay1 form-control" id="relay1_tiempoOffB"
                                        name="relay1_tiempoOffB" v-model="relay1.TIMEOFFRELAY1B"
                                        :disabled="!relay1.TEMPORIZADOR1">
                                </div>
                            </div>
                        </div>

                        <table class="col-xxl-3 col-md-12">
                            <thead>
                                <tr>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>M</th>
                                    <th>M</th>
                                    <th>J</th>
                                    <th>V</th>
                                    <th>S</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BDO"
                                            name="relay1_1BDO" v-model="relay1.DOMINGO1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BLU"
                                            name="relay1_1BLU" v-model="relay1.LUNES1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BMA"
                                            name="relay1_1BMA" v-model="relay1.MARTES1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BMI"
                                            name="relay1_1BMI" v-model="relay1.MIERCOLES1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BJU"
                                            name="relay1_1BJU" v-model="relay1.JUEVES1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BVI"
                                            name="relay1_1BVI" v-model="relay1.VIERNES1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                    <td>

                                        <input class="relay1 form-check-input" type="checkbox" id="relay1_1BSA"
                                            name="relay1_1BSA" v-model="relay1.SABADO1B"
                                            :disabled="!relay1.TEMPORIZADOR1">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_hr_encendido" class="col-sm-4 col-form-label">Hr. de
                                    encendido</label>

                                <div class="col-sm-8">
                                    <input type="datetime-local" class="relay1 form-control" id="relay1_hr_encendido"
                                        name="relay1_hr_encendido" v-model="relay1.FECHAON1" disabled>
                                    <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                        title="Solo informativo"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay1_hr_apagado" class="col-sm-4 col-form-label">Hr. de
                                    apagado</label>
                                <div class="col-sm-8">
                                    <input type="datetime-local" class="relay1 form-control" name="relay1_hr_apagado"
                                        v-model="relay1.FECHAOFF1" disabled>
                                    <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                        title="Solo informativo"></i>
                                </div>
                            </div>
                        </div>
                        <hr>

                        <label class="col-sm-4 col-form-label" for="relay1_enviar">¿Enviar cambios por
                            Telegram?</label>

                        <div class="col-sm-8">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="relay1_enviar"
                                    name="relay1_enviar" v-model="relay1.PROGRAMADO1">
                                <label class="form-check-label" for="relay1_enviar">{{ relay1.PROGRAMADO1 ?
                                    'Si' : 'No' }}</label>
                            </div>

                        </div>


                    </div>

                    <div class="col-12">
                        <button class="btn btn-primary" type="button" @click="save">
                            <i class="bi bi-floppy me-1"></i>
                            Guardar

                        </button>
                    </div>
                </form><!-- End General Form Elements -->
            </div>
        </div>
    </div>


</template>