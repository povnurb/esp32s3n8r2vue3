<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import { useWebsocketsStore } from './store/websockets';
import { onMounted } from 'vue';

const router = useRouter();

//lo que llega por webSocket
const websocketsMessage = useWebsocketsStore();//para el index

router.beforeEach((to, from, next) => {
  //TODO: modificar al nombre del dispositivo
  const defaultTitle = 'VUE32 AdminTool v' + process.env.VUE_APP_VERSION;
  const pageTitle = to.meta.title;
  document.title = pageTitle ? `${pageTitle} - ${defaultTitle}` : defaultTitle;
  next();
});

onMounted(async () => {
  await websocketsMessage.connectToServer();
});

</script>
