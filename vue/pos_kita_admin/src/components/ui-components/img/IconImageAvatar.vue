<template>
    <v-avatar size="60" rounded="0">
        <v-img :height="125" aspect-ratio="1/1" cover 
            :src="`${baseUrl}${id}?t=${new Date().getTime()}`" :alt="altUrl"/>
    </v-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        id: {
            type: String,
            required: true,
        },
        baseUrl: {
            type: String,
            required: true,
        },
        altUrl: {
            default: "",
            type: String,
            required: false,
        },
    },
});
</script>
