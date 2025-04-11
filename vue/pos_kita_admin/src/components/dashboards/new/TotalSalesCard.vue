<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import IconImageAvatar from '@/components/ui-components/img/IconImageAvatar.vue';
import api from '@/axios';

// Define constants or reusable logic here if needed
</script>

<template>
    <v-card elevation="10" class="withbg">
        <!-- Card Header -->
        <v-card-item>
            <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                <v-card-title class="text-h5">Total Sales</v-card-title>
            </div>

            <!-- Revenue Section -->
            <v-col class="">
                <h3 class="text-h4 text-green-lighten-3 ">{{totalSales}}</h3>
            </v-col>

            <!-- Most Selling Product Section -->
            <div v-if="productId != 0">
                <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                    <v-card-title class="text-subtitle-1">The Most Selling Product</v-card-title>
                </div>
                <div class="d-flex align-center ml-1">
                    <!-- Product Avatar -->
                    <v-avatar size="40" rounded="90">
                        <v-img :height="50" aspect-ratio="1/1" cover
                            :src="`${basePictureUrl}${productId}?t=${new Date().getTime()}`" />
                    </v-avatar>

                    <!-- Product Name (Bold) -->
                    <h6 class="text-subtitle-2 text-muted font-weight-bold ml-2">{{productName}}</h6>
                </div>
            </div>
            <div v-else>
                <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                    <v-card-title class="text-subtitle-1">{{productName}}</v-card-title>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'TrafficDistribution',
    data() {
        return {
            // Base URL for product images
            basePictureUrl: import.meta.env.VITE_API_URL + "product/photo/",
            productId: 0,
            productName: '',
            totalSales: '',
            
        };
    },
    async mounted() {
        // Fetch data when the component is mounted
        await this.fetchData();
    },
    methods: {
        async fetchData() {
            var overallTotal = 0;
            var res = await api.get('/order/sales/sumarry');
            var response = res.data;
            overallTotal = response.overall_total;
            this.totalSales = overallTotal.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
            });
            this.productId = response.top_product_id;
            this.productName = response.top_product;
            console.log(response);
        },
    },
};
</script>

<style scoped>
/* Scoped styles for better encapsulation */
.withbg {
    background-color: #f9fafb;
    /* Example background color */
}

.text-muted {
    color: #6c757d;
    /* Example muted text color */
}

.text-green-darken-2 {
    color: #155724;
    /* Dark green color */
}
.text-green-lighten-3 {
    color: #28dd2e;
    /* Light green color */
}
</style>