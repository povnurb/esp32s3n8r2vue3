<script setup lang="ts">
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
//https://datatables.net/blog/2022/vue
DataTable.use(DataTablesCore);

const data = [
    ["Activar relay1", '{"protocol":"MQTT","output":"RELAY1","value":true}', "Activa el relay 1."],
    ["Nombre Dispositivo", '{"protocol":"MQTT","output":"DeviceName","value":"Petrolera_PTTI1"}', "Cambia el nombre del dispositivo."],
    ["Nombre relay1", '{"protocol":"MQTT","output":"R_NAME1","value":"clima principal"}', "cambia el nombre del relevador 1."],
    ["Descripción relay1", '{"protocol":"MQTT","output":"R_DESCRIPTION1","value":"Controla la operación del clima principal"}', "cambia la descripción del relevador 1."],
    ["Desactivar relay1", '{"protocol":"MQTT","output":"RELAY1","value":false}', "Desactiva el relay 1."],
    ["Activar relay2", '{"protocol":"MQTT","output":"RELAY1","value":true}', "Activa el relay 2",],
    ["Nombre relay2", '{"protocol":"MQTT","output":"R_NAME2","value":"clima respaldo"}', "cambia el nombre del relevador 2."],
    ["Descripción relay2", '{"protocol":"MQTT","output":"R_DESCRIPTION2","value":"Controla la operación del clima de respaldo"}', "cambia la descripción del relevador 2."],
    ["Desactivar relay2", '{"protocol":"MQTT","output":"RELAY1","value":false}', "Desactiva el relay 2."],
    ["Activar buzzer", '{"protocol":"MQTT","output":"BUZZER","value":true}', "Activa zumbador."],
    ["Desactivar buzzer", '{"protocol":"MQTT","output":"BUZZER","value":false}', "Desactiva zumbador."],
    ["Tiempo gráfica", '{"protocol":"MQTT","output":"tgrafica","value":1}', "Tiempo de muestreo de temperaturas y humedades de 1 a 1440 minutos."],
    ["Valor dimmer", '{"protocol":"MQTT","output":"DIMMER","value":50}', "Ciclo de trabajo del dimmer el valor es de 0 a 100%."],
    ["Logica Alarma1", '{"protocol":"MQTT","output":"ALARM_LOGICA1","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma1", '{"protocol":"MQTT","output":"ALARM_LOGICA1","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma2", '{"protocol":"MQTT","output":"ALARM_LOGICA2","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma2", '{"protocol":"MQTT","output":"ALARM_LOGICA2","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma3", '{"protocol":"MQTT","output":"ALARM_LOGICA3","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma3", '{"protocol":"MQTT","output":"ALARM_LOGICA3","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma4", '{"protocol":"MQTT","output":"ALARM_LOGICA4","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma4", '{"protocol":"MQTT","output":"ALARM_LOGICA4","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma5", '{"protocol":"MQTT","output":"ALARM_LOGICA5","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma5", '{"protocol":"MQTT","output":"ALARM_LOGICA5","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma6", '{"protocol":"MQTT","output":"ALARM_LOGICA6","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma6", '{"protocol":"MQTT","output":"ALARM_LOGICA6","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma7", '{"protocol":"MQTT","output":"ALARM_LOGICA7","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma7", '{"protocol":"MQTT","output":"ALARM_LOGICA7","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Logica Alarma8", '{"protocol":"MQTT","output":"ALARM_LOGICA8","value":true}', "Activa la alarma con un valor de 0 volts (tierra)."],
    ["Logica Alarma8", '{"protocol":"MQTT","output":"ALARM_LOGICA8","value":false}', "Activa la alarma con un valor positivo de voltaje 3.3 volts."],
    ["Nombre alarma1", '{"protocol":"MQTT","output":"ALARM_NAME1","value":"nuevo nombre"}', "Cambia el nombre de la alarma1."],
    ["Nombre alarma2", '{"protocol":"MQTT","output":"ALARM_NAME2","value":"nuevo nombre"}', "Cambia el nombre de la alarma2."],
    ["Nombre alarma3", '{"protocol":"MQTT","output":"ALARM_NAME3","value":"nuevo nombre"}', "Cambia el nombre de la alarma3."],
    ["Nombre alarma4", '{"protocol":"MQTT","output":"ALARM_NAME4","value":"nuevo nombre"}', "Cambia el nombre de la alarma4."],
    ["Nombre alarma5", '{"protocol":"MQTT","output":"ALARM_NAME5","value":"nuevo nombre"}', "Cambia el nombre de la alarma5."],
    ["Nombre alarma6", '{"protocol":"MQTT","output":"ALARM_NAME6","value":"nuevo nombre"}', "Cambia el nombre de la alarma6."],
    ["Nombre alarma7", '{"protocol":"MQTT","output":"ALARM_NAME7","value":"nuevo nombre"}', "Cambia el nombre de la alarma7."],
    ["Nombre alarma8", '{"protocol":"MQTT","output":"ALARM_NAME8","value":"nuevo nombre"}', "Cambia el nombre de la alarma8."],
    ["Reconocer alarma1", '{"protocol":"MQTT","output":"reconocida1","value":true}', "reconoce la alarma1."],
    ["Reconocer alarma2", '{"protocol":"MQTT","output":"reconocida2","value":true}', "reconoce la alarma2."],
    ["Reconocer alarma3", '{"protocol":"MQTT","output":"reconocida3","value":true}', "reconoce la alarma3."],
    ["Reconocer alarma4", '{"protocol":"MQTT","output":"reconocida4","value":true}', "reconoce la alarma4."],
    ["Reconocer alarma5", '{"protocol":"MQTT","output":"reconocida5","value":true}', "reconoce la alarma5."],
    ["Reconocer alarma6", '{"protocol":"MQTT","output":"reconocida6","value":true}', "reconoce la alarma6."],
    ["Reconocer alarma7", '{"protocol":"MQTT","output":"reconocida7","value":true}', "reconoce la alarma7."],
    ["Reconocer alarma8", '{"protocol":"MQTT","output":"reconocida8","value":true}', "reconoce la alarma8."],
    ["Temporizador relevador1", '{"protocol":"MQTT","output":"TEMPORIZADOR1","value":true}', "Activa el control de tiempo del relevador1."],
    ["Temporizador relevador2", '{"protocol":"MQTT","output":"TEMPORIZADOR2","value":true}', "Activa el control de tiempo del relevador1."],
    ["Encender relay1A", '{"protocol":"MQTT","output":"TIMEONRELAY1A","value":"08:00"}', "Activa por primera vez el relevador1 a la hora indicada."],
    ["Encender relay1B", '{"protocol":"MQTT","output":"TIMEONRELAY1B","value":"18:00"}', "Activa por segunda vez el relevador1 a la hora indicada."],
    ["Encender relay2A", '{"protocol":"MQTT","output":"TIMEONRELAY2A","value":"08:00"}', "Activa por primera vez el relevador2 a la hora indicada."],
    ["Encender relay2B", '{"protocol":"MQTT","output":"TIMEONRELAY2B","value":"18:00"}', "Activa por segunda vez el relevador2 a la hora indicada."],
    ["Apagar relay1A", '{"protocol":"MQTT","output":"TIMEOFFRELAY1A","value":"16:00"}', "Desactiva por primera vez el relevador1 a la hora indicada."],
    ["Apagar relay1B", '{"protocol":"MQTT","output":"TIMEOFFRELAY1B","value":"22:00"}', "Desactiva por segunda vez el relevador1 a la hora indicada."],
    ["Apagar relay2A", '{"protocol":"MQTT","output":"TIMEOFFRELAY2A","value":"08:00"}', "Desactiva por primera vez el relevador2 a la hora indicada."],
    ["Apagar relay2B", '{"protocol":"MQTT","output":"TIMEOFFRELAY2B","value":"08:00"}', "Desactiva por segunda vez el relevador2 a la hora indicada."],
    ["Ajuste DHT22", '{"protocol":"MQTT","output":"device_ajuste_tempDHT","value":"2.1"}', "Ajusta el valor de la temperatura del DHT22 -5.0 a 5.0."],
    ["Ajuste LM35", '{"protocol":"MQTT","output":"device_ajuste_lm35","value":"1.1"}', "Ajusta el valor de la temperatura del LM35 -5.0 a 5.0."],
    ["Ajuste evaporador", '{"protocol":"MQTT","output":"device_ajuste_tempEvaporador","value":"-2.1"}', "Ajusta el valor del sensor de pozo1 -5.0 a 5.0."],
    ["Ajuste condensador", '{"protocol":"MQTT","output":"device_ajuste_tempCondensador","value":"-3.1"}', "Ajusta el valor del sensor de pozo2 -5.0 a 5.0."],
    ["Activar alarmas", '{"protocol":"MQTT","output":"prueba_de_alarmas","value":true}', "Realiza un prueba de alarmas de manera remota (activa)."],
    ["Normalizar alarmas", '{"protocol":"MQTT","output":"prueba_de_alarmas","value":false}', "Normaliza prueba de alarmas (desactiva)."],
    ["Borrar archivo alarmas", '{"protocol":"MQTT","output":"delete_file_alarms","value":true}', "Borra el historial de alarmas en el dispositivo."],
    ["Reiniciar Restart", '{"protocol":"MQTT","output":"RESTART","value":true}', "Reinicia el dispotivo."],
    ["Restaurar Restore", '{"protocol":"MQTT","output":"RESTORE","value":"pasword"}', "Borra configuraciones e información del dispositivo, requiere una contraseña."],
    ["Telegram habilitar", '{"protocol":"MQTT","output":"TELEGRAM","value":true}', "Habilita los mensajes a telegram."],
    ["Telegram deshabilitar", '{"protocol":"MQTT","output":"TELEGRAM","value":false}', "Deshabilita los mensajes a telegram."],
    ["Telegram token", '{"protocol":"MQTT","output":"BOTTOKEN","value":"****************"}', "Token que te da el chat bot de telegram mas de 45 caracteres."],
    ["Telegram chaiID", '{"protocol":"MQTT","output":"CHATID","value":"**********"}', "Token que te da el chat bot de telegram mas de 9 digitos."],
    ["Telegram mensaje", '{"protocol":"MQTT","output":"TELEMENSAJE","value":true}', "Envia mensaje por telegram al chatID guardado."],

];
</script>

<template>
    <div class="col-lg-12 card ">
        <h5 class="card-title">Tabla de comandos JSON por Mqtt</h5>
        <DataTable :data="data" class="display table datatable">
            <thead>
                <tr>
                    <th>
                        <b>Palabras </b>clave
                    </th>
                    <th>Comando JSON (Ejemplos)</th>
                    <!--<th>Value</th>-->
                    <!--<th data-type="date" data-format="YYYY/DD/MM">Start Date</th>-->
                    <th>descripción</th>
                </tr>
            </thead>
        </DataTable>
    </div>
</template>