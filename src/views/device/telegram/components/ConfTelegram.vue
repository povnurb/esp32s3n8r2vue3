<script lang="ts" setup>
import { ITelegramConfig } from '@/interfaces/telegram';
import { ref, onMounted } from 'vue';
import { getTelegram, postTelegram } from '@/api/telegram';
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


const dataTele = ref<ITelegramConfig>({
    telegram: false,
    botToken: "",
    chatID: ""
})

// cuando se carga el componente
onMounted(async () => {
    await dataTelegram();
});

//let newTelegram: boolean;
//let newBotToken: string;
//let newChatID: string;


const dataTelegram = async () => {
    try {
        const resp = await getTelegram();
        dataTele.value = resp;
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
        /*const dataTelePost = ref<ITelegramConfig>({

            telegram: newTelegram,
            botToken: newBotToken,
            chatID: newChatID

        })*/
        const confirmed = await swalConfirmation({
            title: '¿Está seguro que desea guardar los cambios?',
            text: 'La accion modifica la configuración del chat bot de Telegram',
            icon: 'warning'
        });
        if (confirmed) {
            const resp = await postTelegram(dataTele.value);
            if (resp) {
                toastSuccessMsg("Se actualizaron los datos.");
                await dataTelegram();
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
const btnPruebaTelegram = async () => {
    const data: IControl = {
        protocol: 'API',
        output: 'TELEMENSAJE',
        value: true
    }
    enviando.value = true;
    //console.log("Enviando");
    try {
        //console.log("tratando");
        const resp = await postControl(data);
        console.log(resp);
        if (resp.status) {
            toastInfoMsg('Mensaje enviado');
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
</script>
<template>
    <div class="col-lg-12">

        <div class="card">
            <div class="card-body">
                <form>
                    <div class="row mb-5">
                        <label class="col-sm-2 col-form-label" for="activa_telegram">Activar Telegram</label>

                        <div class="col-sm-10">
                            <div class="form-check form-switch" style="padding: 7px 50px;">
                                <input class="relay1 form-check-input" type="checkbox" id="activa_telegram"
                                    name="activa_telegram" v-model="dataTele.telegram">
                                <label class="form-check-label" for="activa_telegram">{{ dataTele.telegram ?
                                    'ON' : 'OFF' }}</label>
                            </div>

                        </div>

                    </div>
                    <div>
                        <label for="">Token Telegram</label>
                        <input :type="passwordVisible ? 'text' : 'password'" :class="`alarma1 form-control`"
                            v-model="dataTele.botToken" :disabled="!dataTele.telegram">
                        <div v-if="passwordVisible"><i type="button" @click="togglePasswordVisibility"
                                :title="`Haz click ocultar contraseña`" class="bi bi-eye"></i></div>
                        <div v-else><i type="button" @click="togglePasswordVisibility"
                                :title="`Haz click mostrar contraseña`" class="bi bi-eye-slash"></i></div>
                    </div>
                    <div>
                        <label for="">chatID</label>
                        <input :type="passwordVisible2 ? 'text' : 'password'" :class="`alarma1 form-control`"
                            v-model="dataTele.chatID" :disabled="!dataTele.telegram">
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
                <button class="btn btn-primary" @click="btnPruebaTelegram">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                        v-if="enviando"></span>
                    <i class="bi bi-telegram h2" v-else></i>
                    {{ enviando ? 'Enviando mensaje ...' : 'Recibir mensaje' }}
                </button>
            </div>
        </div>
    </div>
</template>