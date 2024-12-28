<script setup lang="ts">
import { defineProps } from 'vue';
import { useSaveStoreAlarma } from '@/store/save';
import { useRouter } from 'vue-router';
import { router } from '@/router';

const navigateToPage = () => {
    router.push('/esp-alarm');
}

const saveStoreAlarma = useSaveStoreAlarma();
const props = defineProps<{
    mostrar: boolean
}>();

//actualizar el estado a false oprimiento la X

const resetSaveStore = () => {
    saveStoreAlarma.resetAlarma();//pone el estado en falso
}
</script>
<template>
    <div class="col-lg-12">
        <div class="alert alert-danger alert-dismissible fade show" role="alert" @click="navigateToPage"
            style="cursor: pointer">
            <i class="bi bi-exclamation-octagon me-1"></i>
            Se presentó una Alarma!
            <button v-if="mostrar" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="resetSaveStore"></button>
        </div>
    </div>
</template>
