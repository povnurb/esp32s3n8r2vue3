<script setup lang="ts">

import { useSaveStoreAlarma } from '@/store/save';

const saveStoreAlarma = useSaveStoreAlarma();


//actualizar el estado a false oprimiento la X

const resetSaveStore = () => {
    saveStoreAlarma.resetAlarma();//pone el estado en falso
}
</script>
<template>
    <div class="col-lg-12">
        <div class="alert alert-danger alert-dismissible fade show" role="alert" ref="#">
            <i class="bi bi-exclamation-octagon me-1"></i>
            Se presentó una Alarma!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                @click="resetSaveStore"></button>
        </div>
    </div>
</template>
