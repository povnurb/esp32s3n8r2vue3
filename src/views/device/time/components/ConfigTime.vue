<script lang="ts" setup>
import { ITimeConfig } from '@/interfaces';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { isErrorResponse } from '@/utils/utils';
import { useSaveStore } from '@/store/save';
import { ref, onMounted } from 'vue';
import { gettime, posttime } from '@/api/time'

//definiciones
const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();

const time = ref<ITimeConfig>({

    fecha: ''

})
onMounted(async () => {
    await getData();
});

const getData = async () => {
    try {
        const resp = await gettime();
        //console.log(resp);
        time.value.fecha = resp.fecha;
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
            text: 'Esta acción actualizará la fecha y hora interna del dispositivo.',
            icon: 'warning'
        });
        if (confirmed) {
            //console.log(time.value.fecha);
            const resp = await posttime(time.value);
            if (resp) {
                toastSuccessMsg("Fecha y hora actualizada");
                await getData();
                //saveStore.saveSuccess(true);
            }
        }
        //console.log(time.value.fecha);
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
    <div class="row">
        <div class="col-lg-6">
            <div class="content">
                <div class="row">
                    <!-- Timer Block -->
                    <div class="col-md-12">
                        <div class="block block-rounded block-themed">
                            <div class="block-content">
                                <form id="formt" class="form-vertical">
                                    <div class="row push">
                                        <div class="col-md-12 mb-2 mt-2">
                                            <div>
                                                <label class="form-label" for="time_ajuste">Ajustar Fecha y
                                                    Hora:</label>
                                            </div>
                                        </div>
                                        <div class="mb-4">
                                            <div class="form-group col-md-6 mb-4">
                                                <div class="formt">
                                                    <label class="form-label ml-5" for="time_date">
                                                        (DD/MM/AAAA HH-MM): </label>
                                                    <input type="datetime-local" class="formt" id="time_date"
                                                        v-model="time.fecha">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <button class="btn btn-primary" type="button" @click="save">
                                                <i class="bi bi-floppy me-1"></i>
                                                Guardar

                                            </button>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- END Timer Block -->
                </div>
            </div>


        </div>
    </div>
</template>