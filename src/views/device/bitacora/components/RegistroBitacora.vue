<script setup lang="ts">
import { postBitacora } from '@/api/bitacora'
import { IBitacora } from '@/interfaces/bitacora';
import { defineComponent, ref, } from 'vue';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore, useSaveStoreAlarma } from '@/store/save';

const saveStore = useSaveStore();
const saveStoreAlarma = useSaveStoreAlarma();

const { toastErrorMsg, toastSuccessMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
// Modelo para el formulario
const log = ref<IBitacora>({
    nombretec: '',
    fecha: '',
    tipo: 'Equipo de Transmisión',
    info: ''
});

// Función para resetear el formulario
const resetForm = () => {
    log.value = {
        nombretec: '',
        fecha: '',
        tipo: 'Equipo de Transmisión',
        info: ''
    };
};

// Función para guardar la entrada de bitácora
const saveLog = async (): Promise<void> => {
    try {
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'Esta acción modifica el archivo bitacora.json.',
            icon: 'warning'
        });
        if (confirmed) {
            // Formatear la fecha ingresada
            const date = new Date(log.value.fecha);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            // Crear un nuevo objeto con la fecha formateada
            const logEntry: IBitacora = {
                ...log.value, //los tres puntitos es el operador de propagacion
                fecha: formattedDate
            };
            const resp = await postBitacora(logEntry);
            if (resp) {
                toastSuccessMsg("Se actualizaron los datos.");
                //saveStore.saveSuccess(true);
            }
        }

    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
};



</script>

<template>
    <section class="section">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Registro de eventos importantes</h5>

                    <!-- Floating Labels Form -->
                    <form class="row g-3" @submit.prevent="saveLog">
                        <div class="formt">
                            <input type="datetime-local" v-model="log.fecha" class="form-floating mb-3" id="time_date"
                                required />
                        </div>
                        <div class="col-md-12">
                            <div class="form-floating">
                                <input type="text" v-model="log.nombretec" class="form-control" id="floatingName"
                                    placeholder="Nombre" required />
                                <label for="floatingName">Nombre del técnico</label>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-floating mb-3">
                                <select v-model="log.tipo" class="form-select" id="floatingSelect"
                                    aria-label="Tipo de Evento" required>
                                    <option value="Equipo de Transmisión">Equipo de Transmisión</option>
                                    <option value="Fuerza">Fuerza</option>
                                    <option value="Fibra">Fibra</option>
                                    <option value="Equipo de AC">Equipo de AC</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <label for="floatingSelect">Tipo de evento</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea v-model="log.info" class="form-control" placeholder="Datos"
                                    id="floatingTextarea" style="height: 100px;" required></textarea>
                                <label for="floatingTextarea">Datos:</label>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">Submit</button>
                            <button type="reset" class="btn btn-secondary" @click="resetForm">Reset</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>