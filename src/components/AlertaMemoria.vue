<script setup lang="ts">

import { useSaveStoreSpiffs } from '@/store/save';
import { router } from '@/router';
const saveStoreSpiffs = useSaveStoreSpiffs();

const navigarApagina = () => {
    router.push('/esp-info');
}

const resetSaveStoreSpiffs = () => {
    saveStoreSpiffs.resetSpiffs();
}

</script>
<template>
    <div class="col-lg-12">
        <div class="alert alert-warning alert-dismissible fade show" role="alert" @click="navigarApagina"
            style="cursor: pointer">
            <h4 class="alert-heading">Memoria flash a mas del 60%</h4>
            <i class="bi bi-exclamation-triangle me-1"></i>
            ¡Es recomendable bajar los archivos json de setttings, bitácora y alarmas
            para
            despues restaurar dispositivo a fabrica, esto evitará que el dispositivo redusca su velocidad de
            procesamiento da click aquí para verificar el almacenamiento usado !
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="resetSaveStoreSpiffs"></button>
        </div>
    </div>
</template>