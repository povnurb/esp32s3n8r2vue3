<script lang="ts" setup>

import useToastAlert from '@/composables/useToastAlert';
import { IScanResult } from '@/interfaces/wifi';
import { isErrorResponse } from '@/utils/utils';
import { ref } from 'vue';
import { scanWifiNetworks } from '@/api/wifi';
// para emitir eventos
import evenBus from '@/utils/evenBus';
import { IEventCallback } from '@/interfaces/common';

const { toastErrorMsg } = useToastAlert();

const scan = ref(false);

const networks = ref<IScanResult>(); //aqui estan las redes

const find = ref(0); //para saber cuantas redes se encontraron

const scanNetwork = async () => {
    scan.value = true;//comenso a scanear
    try {
        const resp = await scanWifiNetworks();
        networks.value = resp;
        //para saber cuantas redes hay al alcance
        find.value = networks.value.meta.count;
        scan.value = false;
    } catch (error: unknown) {
        //console.error('Error al obtener la información del WiFi:', error);
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response?.data?.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
            scan.value = false;
        }
    }
};

//boton volver a escanear
const reset = () => {
    scan.value = false;
    networks.value = undefined;
    find.value = 0;
}

// para los eventos
//seleccionar la red wifi
const selecNetwork = (ssid: string) => {
    const data: IEventCallback = { message: ssid };
    //console.log(data);
    evenBus.emit('dataSent', data);
}

</script>

<template>
    <div class="card col-lg-6">
        <div class="badge bg-primary text-uppercase">
            PUEDES ANOTAR DOS REDES WIFI DE LA BANDA DE 2.4 GHZ
        </div>
        <div class="card" v-if="find == 0">
            <div class="card-body text-center bg-secondary-light">
                <div class="badge bg-primary text-uppercase mt-3">{{ find }} Redes encontradas
                </div>
                <div class="text-center mt-5 text-lg fs-4"><i class="bi bi-wifi text-success"
                        style="font-size: 100px"></i>
                    <div class="text-center py-5">
                        <h4 class="fw-bold text-success text-uppercase mb-0">{{ scan ? 'ESCANEANDO REDES WIFI CERCANAS'
                            : 'SE CONECTARA A LA RED CON MEJOR CALIDAD DE SEÑAL DE LAS SELECCIONADAS' }}</h4>

                    </div>
                    <button class="btn btn-success me-1 mb-3" @click="scanNetwork">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                            v-if="scan"></span>
                        <i class="bi bi-fw bi-search opacity-50 me-1" v-else></i>
                        {{ scan ? 'Escaneando ...' : 'Escanear' }}
                    </button>
                </div>
            </div>
        </div>
        <div class="card overflow-auto" v-else>
            <div class="card-body text-center">
                <div class="badge bg-primary text-uppercase mt-3">{{ find }} Redes encontradas
                </div>
            </div>
            <!--<h5 class="card-title">Redes wifi cercanas - <span class="badge bg-success text-white"> {{ find }}</span></h5>-->


            <div class="d-flex justify-content-end"><!--se mueve al extremo izquierdo-->
                <button class="btn btn-success me-1 mb-3" @click="reset">
                    <i class="bi bi-fw opacity-50 me-1"></i>
                    Regresar a escanear
                </button>
            </div>

            <table class="table table-borderless datatable">
                <thead>
                    <tr>
                        <th class="text-center" scope="col">Agregar</th>
                        <th class="text-center" scope="col">SSID</th>
                        <th class="text-center" scope="col">Señal (dBm)</th>
                        <th class="text-center" scope="col">BSSID | Seguridad</th>
                        <th class="text-center" scope="col">Canal</th>
                    </tr>
                </thead>
                <tbody>
                    <!--ciclo for -->
                    <tr v-for="{ n, rssi, ssid, channel, secure } in networks?.data" :key="n">
                        <td class="text-center">
                            <button type="button" class="btn btn-success btn-sm" data-bs-toggle="tooltip"
                                data-bs-placement="top" :title="`Selecciona la red '${ssid}'`"
                                @click="selecNetwork(ssid)">
                                <i class="bi bi-plus-circle"></i>
                            </button>
                        </td>
                        <td class="text-center">{{ ssid }}</td>
                        <td class="text-center">{{ rssi }}</td>
                        <td class="text-center">{{ secure }}</td>
                        <td class="text-center">{{ channel }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>