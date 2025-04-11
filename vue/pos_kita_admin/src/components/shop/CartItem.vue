<template>
    <div>
        <v-card elevation="10">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img height="150" aspect-ratio="1/1" :src="cartPreview?.image"></v-img>

            <v-card-item>
                <h6 class="text-h6 single-line-text" v-text="cartPreview?.title"></h6>
                <div>
                    <span class="text-h6" v-text="`Rp.${cartPreview?.cost}`"></span>
                </div>
            </v-card-item>

            <v-divider class=""></v-divider>



            <v-card-actions>
                
                <v-btn color="error" @click="$emit('remove', cartPreview)">-</v-btn>
                {{ cartPreview?.quantity }}
                <v-btn color="success" @click="$emit('add', cartPreview)">+</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        cartPreview: {
            type: Object
        }
    },
    emits:["add", "remove"],
    data() {
        return {
            
        }
    },
} 
</script>

<style scoped>
.single-line-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>