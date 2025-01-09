<script setup lang="ts">
import { computed, onMounted } from 'vue';
import useSweetAlert from '@/composables/useSweetAlert';
import useToastAlert from '@/composables/useToastAlert';
import { isErrorResponse } from '@/utils/utils';
import { postUserSession } from '@/api/device';
import { useWebsocketsStore } from '@/store/websockets';
import { router } from '@/router';

const { toastSuccessMsg, toastErrorMsg, } = useToastAlert();
const { swalConfirmation } = useSweetAlert();

const websocketsMessage = useWebsocketsStore();//para el index

const irATime = () => {
    router.push('/esp-time');
}

// Define la función select para seleccionar elementos del DOM
function select(selector: string): HTMLElement | null {
    return document.querySelector(selector);
}

// Define la función on para manejar eventos
function on(event: string, selector: string, callback: (event: Event) => void) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        element.addEventListener(event, callback);
    });
}

// cuando se carga el componente
onMounted(() => {
    const toggleSidebarBtn = select('.toggle-sidebar-btn');
    if (toggleSidebarBtn) {
        //on('click', '.toggle-sidebar-btn', (e: Event) => {
        //cuando da click en el boton se muestra y con otro click se oculta
        on('click', '.toggle-sidebar-btn', () => {
            const body = select('body');
            if (body) {
                if (body.classList.toggle('toggle-sidebar')) {
                    on('click', '.main', () => {
                        body.classList.remove('toggle-sidebar');
                    });
                }//esto es un true o false

            }
        });
    }
});

const action = async () => {
    const confirmed = await swalConfirmation({
        title: '¿Desea cerrar la sesión?',
        text: 'esta acción lo sacará del dispositivo',
        icon: 'question',
    });
    if (confirmed) {
        await userLogOut();
    }
}

const userLogOut = async () => {
    try {
        console.log("peticion pedida")
        const resp = await postUserSession();
        if (!resp.session) {
            toastSuccessMsg(resp.msg ?? 'Sesion cerrada correctamente');
            reloadPage('', 6000);
        }
    } catch (error: unknown) {
        if (isErrorResponse(error)) {
            const errorMessage = error.response?.data?.status
                ? `Error: ${error.response.data.status} - ${error.message}`
                : `Error: ${error.message}`;
            toastErrorMsg(errorMessage);
        }
    }
}

const reloadPage = (url: string, time: number) => {
    const timeOut = setTimeout(() => {
        window.location.href = `/${url}`;
        clearTimeout(timeOut);
    }, time);
}

//iconos dinamicos
//wifi
const wifi_status_icon = computed(() => {
    const isConnected = websocketsMessage.message.wifi.wifi_status;
    const icon = isConnected ? "wifi" : "wifi-off";
    const classIcon = isConnected ? "text-success" : "text-dark";
    return { icon, classIcon }
});

//MQTT
const mqtt_status_icon = computed(() => {
    const isConnected = websocketsMessage.message.mqtt.mqtt_status;
    const icon = isConnected ? "cloud-fill" : "cloud-slash-fill";
    const classIcon = isConnected ? "text-info" : "text-dark";
    return { icon, classIcon }
});

//calidad del wifi
const wifiRssiStatus = computed(() => {
    const rssiStatus = websocketsMessage.message.info.wifi_rssi;
    let rssiClass: string;
    let rssiTextClass: string;
    if (rssiStatus >= -55) {
        rssiClass = "reception-4";
        rssiTextClass = "text-info";
    } else if (rssiStatus >= -89) {
        rssiClass = "reception-3";
        rssiTextClass = "text-success";
    } else if (rssiStatus >= -97) {
        rssiClass = "reception-2";
        rssiTextClass = "text-warning";
    } else if (rssiStatus >= -103) {
        rssiClass = "reception-1";
        rssiTextClass = "text-danger";
    } else {
        rssiClass = "reception-0";
        rssiTextClass = "text-secondary";
    }
    return { rssiClass, rssiTextClass };
})

const lugar = computed(() => {
    const sala = websocketsMessage.message.info.sala;
    return sala;
});

const fecha = computed(() => {
    const fecha = websocketsMessage.message.info.device_fecha;
    return fecha;
});



</script>

<template>
    <!-- ======= Header ======= -->
    <header id="header" class="header fixed-top d-flex align-items-center ">

        <div class="d-flex align-items-center justify-content-between">
            <RouterLink :to="{ name: 'Dashboard' }" class="logo d-flex align-items-center">
                <img src="@/assets/logo.png" alt="">
                <!-- TODO: Nombre del dispositivo en VUE32 Tool v2 sera la sala-->
                <span class="d-none d-lg-block">{{ lugar.toUpperCase() }}</span>
            </RouterLink>

            <i class="bi bi-list toggle-sidebar-btn"></i>
        </div><!-- End Logo -->
        <!-- TODO: Fecha -->
        <div class="fecha">
            <!--<div class="fw-semibold"><i class="calendar-event"></i>{{time_update}}</div>-->
            <i class="bi bi-calendar-event"></i>
            <div role="alert" @click="irATime" style="cursor: pointer">Dia: {{ fecha }}</div>

        </div>
        <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">

                <li class="nav-item dropdown">

                    <span :class="`nav-icon nav-link ${wifi_status_icon.classIcon}`" data-bs-toggle="tooltip"
                        title="Estado del WiFi">
                        <i :class="`bi bi-${wifi_status_icon.icon}`"></i>
                    </span><!-- End Notification Icon -->

                </li><!-- End Notification Nav -->

                <li class="nav-item dropdown">

                    <span :class="`${wifiRssiStatus.rssiTextClass} nav-link nav-icon`" data-bs-toggle="tooltip"
                        title="Calidad de señal WiFi">
                        <i :class="`bi bi-${wifiRssiStatus.rssiClass}`"></i>
                    </span><!-- End Messages Icon -->

                </li><!-- End Messages Nav -->


                <li class="nav-item dropdown">

                    <span :class="`nav-icon nav-link ${mqtt_status_icon.classIcon}`" data-bs-toggle="tooltip"
                        title="Estado del MQTT">
                        <i :class="`bi bi-${mqtt_status_icon.icon}`"></i>
                    </span><!-- End Messages Icon -->

                </li><!-- End Messages Nav -->

                <li class="nav-item dropdown pe-3">

                    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle" style="font-size: 1.5rem;"></i>
                        <span class="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                    </a><!-- End Profile Iamge Icon -->

                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li class="dropdown-header">
                            <h6>Admin</h6>
                            <span>Administrador</span>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>
                            <RouterLink :to="{ name: 'Profile' }" class="dropdown-item d-flex align-items-center">
                                <i class="bi bi-person"></i>
                                <span>Perfil</span>
                            </RouterLink>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>
                            <RouterLink :to="{ name: 'Settingns' }" class="dropdown-item d-flex align-items-center">
                                <i class="bi bi-gear"></i>
                                <span>Configuración</span>
                            </RouterLink>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>
                            <a class="dropdown-item d-flex align-items-center" href="https://iotmx.com" target="_blank">
                                <i class="bi bi-question-circle"></i>
                                <span>Ayuda?</span>
                            </a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>

                        <li>
                            <a class="dropdown-item d-flex align-items-center" href="#" @click="action">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Salir</span>
                            </a>
                        </li>

                    </ul><!-- End Profile Dropdown Items -->
                </li><!-- End Profile Nav -->

            </ul>
        </nav><!-- End Icons Navigation -->

    </header><!-- End Header -->
</template>