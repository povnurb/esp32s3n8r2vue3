<script lang="ts" setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import { IMenu } from './sidebarItems';
import { useRoute } from 'vue-router';

const props = defineProps<{ item?: IMenu }>();
// Obtener la ruta actual
const route = useRoute();

const isActive = ref(false);

// verificar y actualizar la clase collapsed
const checkActiveState = () => {
    isActive.value = props.item?.to === route.path ||
        props.item?.children?.some(child => child.to === route.path) || false;
};

// cuando se carga el componente
onMounted(() => {
    checkActiveState();
});

// se encarga de verificar los cambios en la ruta actual
watch(
    () => route.path,
    () => {
        checkActiveState();
    }
);

</script>

<template>
    <li class="nav-item">
        <RouterLink v-if="props.item?.to" :class="['nav-link', { collapsed: !isActive }]"
            :data-bs-target="`#${props.item?.title}-nav`" data-bs-toggle="collapse" :to="props.item?.to">
            <i :class="`bi bi-${props.item?.icon}`"></i>
            <span>{{ props.item?.title }}</span>
            <i class="bi bi-chevron-down ms-auto"></i>
        </RouterLink>
        <ul :id="`${props.item?.title}-nav`" :class="['nav-content', 'collapse', { show: isActive }]"
            data-bs-parent="#sidebar-nav">
            <li v-for="(subitem, i) in props.item?.children" :key="i">
                <RouterLink :to="subitem.to || '/'" :class="{ active: subitem.to === route.path }">
                    <i :class="`bi bi-${subitem.icon}`"></i>
                    <span>{{ subitem.title }}</span>
                </RouterLink>
            </li>
        </ul>
    </li><!-- End Components Nav -->
</template>