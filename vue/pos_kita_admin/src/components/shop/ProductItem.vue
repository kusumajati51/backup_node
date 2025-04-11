<template>
    <div>
        <v-card elevation="10" class="flex-card">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" :key="url" aspect-ratio="1/1" :src="url + '?rnd=' + cacheKey"></v-img>
            <div class="d-flex justify-end mr-4 mt-n5">
                <v-btn size="30" @click="$emit('putChard', sku)" icon class="bg-primary d-flex">
                    <v-avatar size="20" class="text-surface">
                        <BasketIcon size="15" />
                    </v-avatar>
                    <v-tooltip activator="parent" location="bottom">Add To Cart
                    </v-tooltip>
                </v-btn>
            </div>
            <!-- <v-card-title>{{ sku?.product?.name }}</v-card-title> -->
            <v-card-item>
                <h6 class="text-h6 single-line-text" v-text="`${sku?.product?.name} `"></h6>
                <div class="d-flex align-center mt-1">
                    <p class="text-xxl-subtitle-1 single-line-text"> {{ `(${sku?.name})` }}</p>
                </div>
                <div class="d-flex align-center justify-space-between mt-1">
                    <div>
                        <span class="text-h6" v-text="`Rp.  ${sku?.price}`"></span>
                    </div>
                </div>

            </v-card-item>


            <!-- <v-divider class="mx-4 mb-1"></v-divider>

            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" text="Reserve" block border
                    @click="$emit('putChard', sku)"></v-btn>
            </v-card-actions> -->
        </v-card>
    </div>
</template>
<script lang="ts">
export default {
    props: {
        sku: {
            type: Object
        }
    },
    computed: {

    },
    emits: ['putChard'],
    data() {
        return {
            interval: 0,
            price: 0,
            selection: {},
            url: import.meta.env.VITE_API_URL + "product/photo/" + this.sku?.product?.id,
            cacheKey: new Date(),
        };
    },
    setup() {

    },
    created() {
        this.interval = setInterval(() => {
            this.cacheKey = new Date();
        }, 60 * 1000);
        this.url = import.meta.env.VITE_API_URL + "product/photo/" + this.sku?.product?.id;

    },
    updated() {
        this.interval = setInterval(() => {
            this.cacheKey = new Date();
        }, 60 * 1000);
        this.url = import.meta.env.VITE_API_URL + "product/photo/" + this.sku?.product?.id;
    },
    destroyed() {
        clearInterval(this.interval);
    },
    mounted() {

    }

};
</script>

<style scoped>
.flex-card {
    display: flex;
    flex-direction: column;
   
}
.single-line-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
