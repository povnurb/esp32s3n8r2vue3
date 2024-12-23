<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useRoute } from 'vue-router';
import { IMenu } from './sidebarItems';

const props = defineProps<{ item?: IMenu }>();

// Obtener la ruta actual
const route = useRoute();

// Determinar si la clase collapsed debe ser aplicada
const isActive = computed(() => {
    return props.item?.to === route.path;
});

</script>

<template>
    <li class="nav-item">
        <RouterLink v-if="props.item?.to" :class="['nav-link', { collapsed: !isActive }]"  :to="props.item?.to">
            <i :class="`bi bi-${props.item?.icon}`"></i>
            <span>{{ props.item?.title }}</span>
        </RouterLink>
    </li><!-- End Register Page Nav -->
</template>