<script lang="ts" setup>
import { IRelaysConfig2 } from '@/interfaces';
import { ref, onMounted } from 'vue';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { isErrorResponse } from '@/utils/utils';
import { useSaveStore } from '@/store/save';
import { getRelaysConfig2, postRelaysConfig2 } from '@/api/relays';


//definiciones
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();


//TODO: 
const relay2 = ref<IRelaysConfig2>(
    {
        STATUS2: false,
        R_NAME2: '',
        R_DESCRIPTION2: '',
        R_TIMERON2: false,
        R_TIMER2: 0,
        TEMPORIZADOR2: false,
        DOMINGO2A: false,
        LUNES2A: false,
        MARTES2A: false,
        MIERCOLES2A: false,
        JUEVES2A: false,
        VIERNES2A: false,
        SABADO2A: false,
        TIMEONRELAY2A: '',
        TIMEOFFRELAY2A: '',
        DOMINGO2B: false,
        LUNES2B: false,
        MARTES2B: false,
        MIERCOLES2B: false,
        JUEVES2B: false,
        VIERNES2B: false,
        SABADO2B: false,
        TIMEONRELAY2B: '',
        TIMEOFFRELAY2B: '',
        FECHAON2: '',
        FECHAOFF2: '',
        PROGRAMADO2: false,
    }
)

onMounted(async () => {
    await getData();
});

const getData = async () => {
    try {
        const resp = await getRelaysConfig2();
        console.log(resp);
        relay2.value = resp.RELAY2;
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
            console.log(relay2.value);
            const resp = await postRelaysConfig2(relay2.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los valores de configuración del Relay2");
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
                <h5 class="card-title">Configuración del Relay 2(D18)<i id="RELAY02_Status"
                        class="bi bi-lightbulb-fill text-warning" v-if="relay2.STATUS2"></i>
                    <i id="RELAY02_Status" class="bi bi-lightbulb-fill text-dark" v-else></i>
                </h5>

                <!-- Advanced Form Elements -->
                <form>
                    <div class="row mb-5">
                        <label class="col-sm-2 col-form-label" for="relay2_activar">Relay2</label>

                        <div class="col-sm-10">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay2 form-check-input" type="checkbox" id="relay2_activar"
                                    name="relay2_activar" v-model="relay2.STATUS2">
                                <label class="form-check-label" for="relay2_activar">{{ relay2.STATUS2 ?
                                    'ON' : 'OFF' }}</label>
                            </div>

                        </div>

                    </div>
                    <hr>
                    <div class="row mb-3">
                        <label for="relay2_name" class="col-sm-4 col-form-label">Nombre:</label>
                        <div class="col-sm-8">
                            <input type="text" class="relay2 form-control" placeholder="Relay2" id="relay2_name"
                                name="relay2_name" v-model="relay2.R_NAME2">
                        </div>
                        <!-- auto - input nombre Nota: No PUEDEN LLEVAR punto ni espacio-->
                        <span class="badge bg-warning text-dark">Nota: Usar nombre corto y sin espacio</span>
                    </div>
                    <div>
                        <label for="relay2_descripcion" class="col-sm-3 col-form-label">Descripción:</label>
                        <div class="col-sm-12">
                            <input type="text" class="relay2 form-control" placeholder="ejemplo: Control de acceso"
                                id="relay2_descripcion" name="relay2_descripcion" v-model="relay2.R_DESCRIPTION2">
                        </div>
                        <!-- auto - input descripción -->
                    </div>
                    <div class="row mb-3 mt-3">
                        <!-- Accordion configuración  -->
                        <label style="background-color: rgb(173, 231, 197);" for="relay2_timer"
                            class="col-sm-4 col-form-label">Timer
                            <!-- auto - switch Timer -->
                        </label>
                        <div style="background-color: rgb(173, 231, 197);" class="col-sm-8">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay2 form-check-input" type="checkbox" id="relay2_timer"
                                    name="relay2_timer" v-model="relay2.R_TIMERON2">
                                <label class="form-check-label" for="relay2_timer">{{ relay2.R_TIMERON2 ? 'ON'
                                    : 'OFF' }}</label>

                                <input type="number" min="1" max="3600" id="relay2_segundos" name="relay2_segundos"
                                    class="relay2 form-control col-sm-2" v-model="relay2.R_TIMER2"
                                    :disabled="!relay2.R_TIMERON2">

                            </div>
                            <!-- Tiempo de duracion del relay -->
                        </div><span class="badge bg-info text-dark">Activa el relevador de 1 hasta 3600
                            seg.(1hr)</span>
                        <hr>
                        <label for="relay2_temporizador" style="background-color: rgb(173, 231, 197);"
                            class="col-sm-4 col-form-label">Temporizador</label>

                        <div style="background-color: rgb(173, 231, 197);" class="col-sm-8" id="switchTEMPORIZADOR2">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay2 form-check-input" type="checkbox" id="relay2_temporizador"
                                    name="relay2_temporizador" v-model="relay2.TEMPORIZADOR2">
                                <label class="form-check-label" for="relay2_temporizador">{{ relay2.TEMPORIZADOR2 ?
                                    'ON' : 'OFF' }}</label>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_tiempoOnA" class="col-sm-4 col-form-label">Encender</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay2 form-control" id="relay2_tiempoOffA"
                                        name="relay2_tiempoOffA" v-model="relay2.TIMEONRELAY2A"
                                        :disabled="!relay2.TEMPORIZADOR2">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_tiempoOffA" class="col-sm-4 col-form-label">Apagar</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay2 form-control" id="relay2_tiempoOffA"
                                        name="relay2_tiempoOffA" v-model="relay2.TIMEOFFRELAY2A"
                                        :disabled="!relay2.TEMPORIZADOR2">
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

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2ADO"
                                            name="relay2_2ADO" v-model="relay2.DOMINGO2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2ALU"
                                            name="relay2_2ALU" v-model="relay2.LUNES2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2AMA"
                                            name="relay2_2AMA" v-model="relay2.MARTES2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2AMI"
                                            name="relay2_2AMI" v-model="relay2.MIERCOLES2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2AJU"
                                            name="relay2_2AJU" v-model="relay2.JUEVES2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2AVI"
                                            name="relay2_2AVI" v-model="relay2.VIERNES2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2ASA"
                                            name="relay2_2ASA" v-model="relay2.SABADO2A"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                        <hr>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_tiempoOnB" class="col-sm-4 col-form-label">Encender</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay2 form-control" id="relay2_tiempoOnB"
                                        name="relay2_tiempoOnB" v-model="relay2.TIMEONRELAY2B"
                                        :disabled="!relay2.TEMPORIZADOR2">
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_tiempoOffB" class="col-sm-4 col-form-label">Apagar</label>
                                <div class="col-sm-8">
                                    <input type="time" class="relay2 form-control" id="relay2_tiempoOffB"
                                        name="relay2_tiempoOffB" v-model="relay2.TIMEOFFRELAY2B"
                                        :disabled="!relay2.TEMPORIZADOR2">
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

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BDO"
                                            name="relay2_2BDO" v-model="relay2.DOMINGO2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BLU"
                                            name="relay2_2BLU" v-model="relay2.LUNES2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BMA"
                                            name="relay2_2BMA" v-model="relay2.MARTES2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BMI"
                                            name="relay2_2BMI" v-model="relay2.MIERCOLES2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BJU"
                                            name="relay2_2BJU" v-model="relay2.JUEVES2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BVI"
                                            name="relay2_2BVI" v-model="relay2.VIERNES2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                    <td>

                                        <input class="relay2 form-check-input" type="checkbox" id="relay2_2BSA"
                                            name="relay2_2BSA" v-model="relay2.SABADO2B"
                                            :disabled="!relay2.TEMPORIZADOR2">
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <hr>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_hr_encendido" class="col-sm-4 col-form-label">Hr. de
                                    encendido</label>
                                <div class="col-sm-8">
                                    <input type="datetime-local" class="relay2 form-control" id="relay2_hr_encendido"
                                        name="relay2_hr_encendido" v-model="relay2.FECHAON2" disabled>
                                    <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                        title="Solo informativo"></i>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="row mb-3">
                                <label for="relay2_hr_apagado" class="col-sm-4 col-form-label">Hr. de
                                    apagado</label>
                                <div class="col-sm-8">
                                    <input type="datetime-local" class="relay2 form-control" id="relay2_hr_apagado"
                                        name="relay2_hr_apagado" v-model="relay2.FECHAOFF2" disabled>
                                    <i class="bi bi-info-circle me-1" data-bs-toggle="tooltip" data-bs-placement="right"
                                        title="Solo informativo"></i>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <label class="col-sm-4 col-form-label" for="relay2_enviar">¿Enviar cambios por
                            Telegram?</label>

                        <div class="col-sm-8">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="relay2_enviar"
                                    name="relay2_enviar" v-model="relay2.PROGRAMADO2">
                                <label class="form-check-label" for="relay2_enviar">{{ relay2.PROGRAMADO2 ?
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
                </form><!-- End General Form Elements probablemente hay que subirlo-->
            </div>
        </div>
    </div>


</template>