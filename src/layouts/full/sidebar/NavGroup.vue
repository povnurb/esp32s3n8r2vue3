<script lang="ts" setup>

import { defineProps } from 'vue';
import { IMenu } from './sidebarItems';

const props = defineProps<{ item?: IMenu }>();

</script>

<template>
    <!--se dibuja con el v-if si vieje en caso contrario sale el v-else-->
    <li class="nav-heading" v-if="props.item">{{ props.item.header }}</li>
    <li class="nav-heading" v-else>Default Header</li>
</template>