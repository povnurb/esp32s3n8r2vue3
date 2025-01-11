<script lang="ts" setup>
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue';
import ConfTelegram from './components/ConfTelegram.vue';


const page = 'Configuración de Telegram';

const breadcrumbs = [
    { text: 'Inicio', disabled: false, to: '/' },
    { text: 'Dispositivo', disabled: true, to: '#' },
    { text: 'Configuración Telegram', disabled: true, to: '' },
]

</script>

<template>
    <BaseBreadcrumb :title="page" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <section class="section">
        <div class="row">
            <ConfTelegram />
        </div>
        <div class="card">
            <div class="card-title">

                <h1>Instrucciones para obtener las credenciales (Token Telegram y chatID)</h1>
            </div>
            <div class="card-body">

                <h3>Primer paso: Crear un Bot en Telegram</h3>
                <p>Busca el bot <strong>@BotFather</strong> en Telegram.</p>
                <p>Crear un nuevo bot usando el
                    comando <code>/newbot</code> y sigue las instrucciones para obtener el token de API necesario,
                    este será tu Token Telegram.</p>

                <h3>Segundo paso: Obtener el chatID</h3>
                <p>busca el bot <strong>@GET MY ID</strong> en Telegram.
                </p>
                <p> Manda el mensaje <code>/start</code> el cual te dara mas informacion copia el <strong>User Id
                        ID:</strong> ese es tu chatID.
                </p>

                <p>Y listo ya podras recibir los mensaje en Telegram.</p>
            </div>
        </div>
    </section>
</template>