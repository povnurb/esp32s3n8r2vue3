const MainRoutes = {
    path: '/',
    meta: {
        requiresAuth: true
    },
    redirect: '/dashboard',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: ()=> import('@/views/dashboard/StarterPage.vue'),
            meta: {
                title: 'Dashboard',
            }
        },
        {//el sidebartItems.ts me manda aca
            name: 'Informacion',
            path: '/esp-info',
            component: ()=> import('@/views/device/info/InfoPage.vue'),
            meta: {
                title: 'Información',
            }
        },
        {
            name: 'Alarmas',
            path: '/esp-alarm',
            component: ()=> import('@/views/device/alarmas/AlarmPage.vue'),
            meta: {
                title: 'Alarmas',
            }
        },
        {
            name: 'Relevadores',
            path: '/esp-relays',
            component: ()=> import('@/views/device/rele/RelePage.vue'),
            meta: {
                title: 'Relevadores',
            }
        },
        
        {
            name: 'WiFi',
            path: '/esp-wifi',
            component: ()=> import('@/views/connections/wifi/WifiPage.vue'),
            meta: {
                title: 'Configuraciones del WiFi',
            }
        },
        {
            name: 'MQTT',
            path: '/esp-mqtt',
            component: ()=> import('@/views/connections/mqtt/MqttPage.vue'),
            meta: {
                title: 'Configuraciones del MQTT',
            }
        },
        {
            name: 'Telegram',
            path: '/esp-telegram',
            component: ()=> import('@/views/device/telegram/TelePage.vue'),
            meta: {
                title: 'Telegram',
            }
        },
        {
            name: 'Whatsapp',
            path: '/esp-whatsapp',
            component: ()=> import('@/views/device/whatsapp/whatsappPage.vue'),
            meta: {
                title: 'WhatsApp',
            }
        },
        {
            name: 'Historial',
            path: '/esp-historial',
            component: ()=> import('@/views/device/historial/HistorialPage.vue'),
            meta: {
                title: 'Historial de alarmas',
            }
        },
        {
            name: 'Etiquetado',
            path: '/esp-etiquetado',
            component: ()=> import('@/views/device/etiquetado/EtiquetadoPage.vue'),
            meta: {
                title: 'Etiquetado de alarmas',
            }
        },
        {
            name: 'Restore',
            path: '/esp-restore',
            component: ()=> import('@/views/device/restore/RestorePage.vue'),
            meta: {
                title: 'Restaurar a fábrica',
            }
        },
        {
            name: 'Restart',
            path: '/esp-restart',
            component: ()=> import('@/views/device/restart/RestartPage.vue'),
            meta: {
                title: 'Reiniciar el dispositivo',
            }
        },
        {
            name: 'Settingns',
            path: '/esp-device',
            component: ()=> import('@/views/device/settings/SettingsPage.vue'),
            meta: {
                title: 'Configuraciones del dispositivo',
            }
        },
        {
            name: 'Time',
            path: '/esp-time',
            component: ()=> import('@/views/device/time/TimePage.vue'),
            meta: {
                title: 'Configuración de fecha y hora',
            }
        },
        {
            name: 'Bitacora',
            path: '/esp-bitacora',
            component: ()=> import('@/views/device/bitacora/BitacoraPage.vue'),
            meta: {
                title: 'Registro de eventos',
            }
        },
        {
            name: 'Profile',
            path: '/esp-admin',
            component: ()=> import('@/views/device/user/UserPage.vue'),
            meta: {
                title: 'Cambio de contraseña',
            }
        }
    ]
};

export default MainRoutes;