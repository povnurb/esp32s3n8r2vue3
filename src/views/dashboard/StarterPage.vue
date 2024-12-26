<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { IApiIndexResponseWs } from '@/interfaces';
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import CardPage from './components/CardPage.vue';
import ReleCard from './components/ReleCard.vue';
//import DimmerCard from './components/DimmerCard.vue';
import GraficaTempDht from './components/GraficaTempDht.vue';
import GraficaHumDht from './components/GraficaHumDht.vue';
import GraficaEva from './components/GraficaEva.vue';
import GraficaCon from './components/GraficaCon.vue';
//import GrafEvayCond from './components/GrafEvayCond.vue';
import { isErrorResponse } from '@/utils/utils';
import useToastAlert from '@/composables/useToastAlert';
import { getIndexWs } from '@/api/device';
import { useWebsocketsStore } from '@/store/websockets';

const page = 'Dashboard';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },

]

const { toastErrorMsg } = useToastAlert();

//lo que llega por webSocket
const websocketsMessage = useWebsocketsStore();//para el index
//habria que copiar uno para para las demas paginas

// respuesta de Websocket
const apiIndexResponseWs = ref<IApiIndexResponseWs>({

    wifi: {
        wifi_status: false,
        wifi_ssid: "",
        wifi_ipv4: "",
        wifi_mac: ""
    },
    mqtt: {
        mqtt_status: false,
        mqtt_server: "",
        mqtt_user: "",
        mqtt_id: ""
    },
    info: {
        device_fecha: "",
        device_serial: "",
        sala: "",
        device_name: "",
        device_id: "",
        device_mdns: "",
        device_firmware: "",
        device_hardware: "",
        device_manufacture: "",
        device_frequency: 0,
        device_ram: 0,
        device_spiffs: 0,
        device_flash: 0,
        device_time: "",
        device_restart: 0,
        spiffs_used: 0,
        spiffs_total: 0,
        ram_available: 0,
        ram_total: 0,
        wifi_rssi: 0,
        wifi_quality: 0,
        tempEvaporador: "",
        tempCondensador: "",
        tempLm35: "",
        tcdht22: "",
        humdht22: "",
        tmin: "",
        tmax: "",
        buzzer_status: false
    },
    alarmas: [{
        numero: 0,
        name: "",
        logic: false,
        status: false,
        reconocida: false,
        on: "",
        off: "",
        count: 0
    }],
    outputs: [
        {
            name: "",
            status: false
        },
        {
            name: "",
            status: false
        },
        {
            name: "",
            status: 0
        }
    ],
    tdht22: {
        cT0: 0,
        cT1: 0,
        cT2: 0,
        cT3: 0,
        cT4: 0,
        cT5: 0,
        cT6: 0,
        cT7: 0,
        cT8: 0,
        cT9: 0,
        cT10: 0,
        cT11: 0,
        cT12: 0,
        cT13: 0,
        cT14: 0,
        cT15: 0,
        cT16: 0,
        cT17: 0,
        cT18: 0,
        cT19: 0,
        cT20: 0,
        cT21: 0,
        cT22: 0,
        //cT23: 0
    },
    hdht22: {
        cH0: 0,
        cH1: 0,
        cH2: 0,
        cH3: 0,
        cH4: 0,
        cH5: 0,
        cH6: 0,
        cH7: 0,
        cH8: 0,
        cH9: 0,
        cH10: 0,
        cH11: 0,
        cH12: 0,
        cH13: 0,
        cH14: 0,
        cH15: 0,
        cH16: 0,
        cH17: 0,
        cH18: 0,
        cH19: 0,
        cH20: 0,
        cH21: 0,
        cH22: 0,
        //cH23: 0
    },
    tEva: {
        tE0: 0,
        tE1: 0,
        tE2: 0,
        tE3: 0,
        tE4: 0,
        tE5: 0,
        tE6: 0,
        tE7: 0,
        tE8: 0,
        tE9: 0,
        tE10: 0,
        tE11: 0,
        tE12: 0,
        tE13: 0,
        tE14: 0,
        tE15: 0,
        tE16: 0,
        tE17: 0,
        tE18: 0,
        tE19: 0,
        tE20: 0,
        tE21: 0,
        tE22: 0,
        //tE23: 0
    },
    tCond: {
        tC0: 0,
        tC1: 0,
        tC2: 0,
        tC3: 0,
        tC4: 0,
        tC5: 0,
        tC6: 0,
        tC7: 0,
        tC8: 0,
        tC9: 0,
        tC10: 0,
        tC11: 0,
        tC12: 0,
        tC13: 0,
        tC14: 0,
        tC15: 0,
        tC16: 0,
        tC17: 0,
        tC18: 0,
        tC19: 0,
        tC20: 0,
        tC21: 0,
        tC22: 0,
        //tC23: 0
    },
    timeM: {
        tm0: 0,
        tm1: 0,
        tm2: 0,
        tm3: 0,
        tm4: 0,
        tm5: 0,
        tm6: 0,
        tm7: 0,
        tm8: 0,
        tm9: 0,
        tm10: 0,
        tm11: 0,
        tm12: 0,
        tm13: 0,
        tm14: 0,
        tm15: 0,
        tm16: 0,
        tm17: 0,
        tm18: 0,
        tm19: 0,
        tm20: 0,
        tm21: 0,
        tm22: 0,
        //tm23: 0
    }

});

onMounted(async () => {
    await getData();
})

const getData = async () => {
    try {
        const resp = await getIndexWs();
        if (resp) {
            //console.log(resp);
            //apiIndexResponse.value.wifi = resp.wifi;
            //apiIndexResponse.value.mqtt = resp.mqtt;
            //apiIndexResponse.value.info = resp.info;
            //apiIndexResponse.value.outputs = resp.outputs;
            apiIndexResponseWs.value = resp;
        }
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response.data.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }

};

watch(
    () => websocketsMessage.message as IApiIndexResponseWs,
    (newMessage) => {
        if (newMessage) {
            apiIndexResponseWs.value = newMessage;
            //console.log(newMessage);
        }
    }
)

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <!-- End Page Title -->

    <section class="section">
        <div class="row dashboard">
            <CardPage :info="apiIndexResponseWs?.info" />
        </div>
        <!--el row los acomoda en filas-->
        <div class="row">
            <div class="col-lg-6">
                <ReleCard :outputs="apiIndexResponseWs?.outputs[0]" />
            </div>
            <!--Relay2-->
            <div class="col-lg-6">
                <ReleCard :outputs="apiIndexResponseWs?.outputs[1]" />
            </div>
            <!--dimmer--><!--GraficaTempDht-->
            <!--<div class="col-lg-4">
                <DimmerCard :outputs="apiIndexResponseWs?.outputs" />
            </div>-->
            <!--<div class="col-lg-6">
                <GrafEvayCond :outputs="apiIndexResponseWs?.outputs" />
            </div>-->

        </div>
        <!-- Default Accordion -->
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <strong>Graficas de sala</strong>
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="row">
                        <div class="col-lg-6">
                            <GraficaTempDht :tdht22="apiIndexResponseWs?.tdht22" :timeM="apiIndexResponseWs?.timeM"
                                :key="apiIndexResponseWs.timeM.tm0" />
                        </div>
                        <div class="col-lg-6">
                            <GraficaHumDht :hdht22="apiIndexResponseWs?.hdht22" :timeM="apiIndexResponseWs?.timeM"
                                :key="apiIndexResponseWs.hdht22.cH0" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <strong>Graficas de equipo de Aire Acondicionado</strong>
                    </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <GraficaEva :tEva="apiIndexResponseWs?.tEva" :timeM="apiIndexResponseWs?.timeM"
                                    :key="apiIndexResponseWs.tEva.tE0" />
                            </div>
                            <div class="col-lg-6">
                                <GraficaCon :tCon="apiIndexResponseWs?.tCond" :timeM="apiIndexResponseWs?.timeM"
                                    :key="apiIndexResponseWs.tCond.tC0" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div><!-- End Default Accordion Example -->


    </section>
</template>