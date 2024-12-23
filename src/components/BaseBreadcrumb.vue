<script lang="ts" setup>

import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    //breadcrumbs: Array as any, // un warning
    breadcrumbs: Array as any,
    icon: String
});

</script>

<template>
    <div class="pagetitle">
        <!-- automatico -->
        <h1>{{ props.title }}</h1>
        <nav>
            <ol class="breadcrumb">
                <li v-for="(item, index) in props.breadcrumbs" :key="index" class="breadcrumb-item">
                    <RouterLink v-if="!item.disabled" :to="item.to">{{ item.text }}</RouterLink>
                    <span v-else>{{ item.text }}</span>
                </li>
            </ol>
        </nav>
    </div>
</template>