<script lang="ts" setup>
import { isErrorResponse } from '@/utils/utils';
import { ref } from 'vue';
import useToastAlert from '@/composables/useToastAlert';
import useSweetAlert from '@/composables/useSweetAlert';
import { useSaveStore } from '@/store/save';
import { IPasswordForm } from '@/interfaces/user';
import { postUpdatePassword } from '@/api/device';

const { toastSuccessMsg, toastErrorMsg } = useToastAlert();
const { swalConfirmation } = useSweetAlert();
const saveStore = useSaveStore();

const form = ref<IPasswordForm>({
    device_old_password: '',
    device_new_password: '',
    device_c_new_password: ''
});

const clearForm = () => {
    form.value = {
        device_old_password: '',
        device_new_password: '',
        device_c_new_password: ''
    }
}

const passwordUpdate = async () => {
    try {
        const resp = await postUpdatePassword(form.value);
        if (resp.save) {
            toastSuccessMsg(resp.msg ?? 'Se actualizo la contraseña correctamente');
            saveStore.saveSuccess(true);
        } else {
            toastErrorMsg(resp.msg ?? 'Error desconocido');
        }
        clearForm();
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response.data.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            // actualiza el store
            saveStore.saveError();
            clearForm();
        }
    }
}

const action = async () => {
    const confirmed = await swalConfirmation({
        title: '¿Está seguro de cambiar su contraseña?',
        text: 'Una vez realizado el cambio, deberá volver a iniciar sesión',
        icon: 'question',
    });
    if (confirmed) {
        await passwordUpdate();
    }
}

//----------------------------------------------------------------


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

</script>

<template>
    <div class="col-xl-6">

        <div class="card">
            <div class="card-header">Editar contraseña</div>
            <div class="card-body">
                <!-- Change Password Form -->
                <form>
                    <div>
                        <div class="row mb-3 mt-4"><label class="col-md-4 col-lg-4 col-form-label"
                                for="device_old_password">Contraseña actual</label>
                            <div class="col-md-8 col-lg-8"><input class="form-control pass" type="password"
                                    id="device_old_password" name="device_old_password"
                                    v-model="form.device_old_password"></div>
                        </div>
                        <div class="row mb-3"><label class="col-md-4 col-lg-4 col-form-label"
                                for="device_new_password">Nueva contraseña</label>
                            <div class="col-md-8 col-lg-8"><input class="form-control pass"
                                    :type="passwordVisible ? 'text' : 'password'" id="device_new_password"
                                    name="device_new_password" v-model="form.device_new_password">
                                <div v-if="passwordVisible"><i type="button" @click="togglePasswordVisibility"
                                        :title="`Haz click ocultar contraseña`" class="bi bi-eye"></i></div>
                                <div v-else><i type="button" @click="togglePasswordVisibility"
                                        :title="`Haz click mostrar contraseña`" class="bi bi-eye-slash"></i></div>
                            </div>
                        </div>
                        <div class="row mb-3"><label class="col-md-4 col-lg-4 col-form-label"
                                for="device_c_new_password">Repetir contraseña</label>
                            <div class="col-md-8 col-lg-8"><input class="form-control pass"
                                    :type="passwordVisible2 ? 'text' : 'password'" id="device_c_new_password"
                                    name="device_c_new_password"
                                    v-model="form.device_c_new_password"><!-- TODO:<i class="bi bi-eye" id="togglePassword"></i>-->
                                <div v-if="passwordVisible2"><i type="button" @click="togglePasswordVisibility2"
                                        :title="`Haz click ocultar contraseña`" class="bi bi-eye"></i></div>
                                <div v-else><i type="button" @click="togglePasswordVisibility2"
                                        :title="`Haz click mostrar contraseña`" class="bi bi-eye-slash"></i></div>

                            </div>
                        </div>
                        <div class="mb-2">
                            <button class="btn btn-primary" type="button" @click="action">
                                <i class="bi bi-key me-1"></i>Actualizar
                            </button>
                        </div>
                    </div>
                </form><!-- End Change Password Form -->
            </div>
        </div>

    </div>
</template>