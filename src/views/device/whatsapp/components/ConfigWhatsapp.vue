<script lang="ts" setup>
import { IWhatsappConfig } from '@/interfaces/whatsapp';
import { ref, onMounted } from 'vue';
import { getWhatsapp, postWhatsapp } from '@/api/whatsapp';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore, useSaveStoreAlarma } from '@/store/save';
import { postControl } from '@/api/device';
import { IControl } from '@/interfaces';

const saveStore = useSaveStore();
const saveStoreAlarma = useSaveStoreAlarma();

const { toastErrorMsg, toastSuccessMsg, toastInfoMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
//lo que llega por webSocket


const dataWhats = ref<IWhatsappConfig>({
    whatsapp: false,
    MobileNumber: "",
    APIKey: ""
})

// cuando se carga el componente
onMounted(async () => {
    await dataWhatsapp();
});

//let newTelegram: boolean;
//let newBotToken: string;
//let newChatID: string;


const dataWhatsapp = async () => {
    try {
        const resp = await getWhatsapp();
        dataWhats.value = resp;
        //newTelegram = resp.telegram;
        //newBotToken = resp.botToken;
        //newChatID = resp.chatID;

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

        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'La accion modifica la configuración del chat bot de Telegram',
            icon: 'warning'
        });
        if (confirmed) {
            const resp = await postWhatsapp(dataWhats.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los datos.");
                await dataWhatsapp();
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
//-----------------------------------------------------
// Estado reactivo para controlar si la contraseña es visible
const passwordVisible = ref<boolean>(false);

// Alternar visibilidad de la contraseña
const togglePasswordVisibility = () => {
    passwordVisible.value = !passwordVisible.value;
};

// Estado reactivo para controlar si la contraseña es visible
const passwordVisible2 = ref<boolean>(false);

// Alternar visibilidad de la contraseña
const togglePasswordVisibility2 = () => {
    passwordVisible2.value = !passwordVisible2.value;
};

//boton de prueba de mensaje de telegram
const enviando = ref(false);
const btnPruebaWhatsapp = async () => {
    const data: IControl = {
        protocol: 'API',
        output: 'WHATSMENSAJE',
        value: true
    }
    enviando.value = true;
    //console.log("Enviando");
    try {
        const resp = await postControl(data);
        console.log(resp);
        if (resp.status) {
            toastInfoMsg('Mensaje enviado por Whatsapp');
            enviando.value = false;
        }
    } catch (error: unknown) {

        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            enviando.value = false;
        }
    }
};

const phoneNumber = ref('')

const validateInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    // Permite solo números
    input.value = input.value.replace(/\D/g, '')
    phoneNumber.value = input.value
}

</script>
<template>
    <div class="col-lg-12">

        <div class="card">
            <div class="card-body">
                <form>
                    <div class="row mb-5">
                        <label class="col-sm-2 col-form-label" for="activa_whatsapp">Activar WhatsApp</label>

                        <div class="col-sm-10">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="activa_whatsapp"
                                    name="activa_whatsapp" v-model="dataWhats.whatsapp">
                                <label class="form-check-label" for="activa_whatsapp">{{ dataWhats.whatsapp ?
                                    'ON' : 'OFF' }}</label>
                            </div>

                        </div>

                    </div>
                    <div>
                        <label for="">Numero de Celular a 13 digitos</label>
                        <input maxlength="13" @input="validateInput" class="alarma1 form-control" v-model="dataWhats.MobileNumber"
                            :disabled="!dataWhats.whatsapp">

                    </div>
                    <div>
                        <label for="">ApiKey</label>
                        <input :type="passwordVisible2 ? 'text' : 'password'" :class="`alarma1 form-control`"
                            v-model="dataWhats.APIKey" :disabled="!dataWhats.whatsapp">
                        <div v-if="passwordVisible2"><i type="button" @click="togglePasswordVisibility2"
                                :title="`Haz click ocultar contraseña`" class="bi bi-eye"></i></div>
                        <div v-else><i type="button" @click="togglePasswordVisibility2"
                                :title="`Haz click mostrar contraseña`" class="bi bi-eye-slash"></i></div>
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
                <button class="btn btn-success" @click="btnPruebaWhatsapp">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                        v-if="enviando"></span>
                    <i class="bi bi-whatsapp h2" v-else></i>
                    {{ enviando ? 'Enviando mensaje ...' : 'Recibir mensaje' }}
                </button>
            </div>
        </div>
    </div>
</template>