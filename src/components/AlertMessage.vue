<script setup lang="ts">

import { useSaveStore } from '@/store/save';
import { router } from '@/router';
const saveStore = useSaveStore();

const navigarApagina = () => {
    router.push('/esp-restart');
}

const resetSaveStore = () => {
    saveStore.resetSave();
}

</script>
<template>
    <div class="col-lg-12">
        <div class="alert alert-warning alert-dismissible fade show" role="alert" @click="navigarApagina"
            style="cursor: pointer">
            <i class="bi bi-exclamation-triangle me-1"></i>
            ¡Se han realizado cambios en las configuraciones, es necesario reiniciar el equipo!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="resetSaveStore"></button>
        </div>
    </div>
</template>