<script lang="ts" setup>
//nos traemos algunas cosas para el template
import { shallowRef } from 'vue';
import sidebarItems from './sidebarItems';
import NavGroup from './NavGroup.vue';
import NavItem from './NavItem.vue';
import NavCollapse from './NavCollapse.vue';

//shallowRef es para mejorar el rendimiento y la reactividad no sea profunda
const sidebarMenu = shallowRef(sidebarItems);

</script>

<template>
    <!-- ======= Sidebar ======= -->
    <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">
            <!--ciclo for-->
            <template v-for="(item, i) in sidebarMenu" :key="i">
                <!-- item sub header -->
                <NavGroup :item="item" v-if="item.header" :key="item.title" />
                <!-- If has child -->
                <NavCollapse :item="item" v-else-if="item.children" />
                <!-- single item -->
                <NavItem :item="item" v-else />
            </template>
        </ul>
    </aside>
</template>