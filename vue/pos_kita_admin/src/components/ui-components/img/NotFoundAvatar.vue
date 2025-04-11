<template>
    <v-avatar size="60" rounded="0">
        <v-img :height="125" aspect-ratio="1/1" cover :src="`${url}`"
           />
    </v-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            url: import.meta.env.VITE_API_URL + "picture_notfound",
        }
    },
});
</script>
