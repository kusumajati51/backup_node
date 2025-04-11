<template>
    <div>

        <!-- Loader -->
        <v-progress-circular v-if="loading" indeterminate color="primary" class="d-block mx-auto"></v-progress-circular>

        <!-- Error Message -->
        <v-alert v-if="error" type="error" class="mt-4">
            {{ error }}
        </v-alert>
        <UiParentCard v-if="product" title="Detail Order">
            <div>
                <v-row class="d-flex align-items-start">
                    <v-col class="font-weight-bold pr-md-2">
                        Product Name
                    </v-col>
                    <v-col class="pl-md-2">
                        {{ product.name }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col class="font-weight-bold pr-2">
                        Product Code
                    </v-col>
                    <v-col class="pl-md-2">
                        {{ product.code_product }}
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="font-weight-bold pr-2">
                        Created At
                    </v-col>
                    <v-col class="pl-md-2">
                        {{ formatDate(product.created_at) }}
                    </v-col>
                </v-row>


                <v-row>
                    <v-col class="font-weight-bold pr-2">
                        Updated At
                    </v-col>
                    <v-col class="pl-md-2">
                        {{ formatDate(product.updated_at) }}
                    </v-col>
                </v-row>

            </div>
        </UiParentCard>
        <!-- Product Card -->
    
    </div>
</template>

<script lang="ts">
import api from "@/axios";
import UiParentCard from '@/components/shared/UiParentCard.vue';
import type ApiResponse from "@/models/ApiResponse.model";

export default {
    components: {
        UiParentCard
    },
    data() {
        return {
            loading: true,
            error: "",
            product: null as any,
        };
    },
    props: {
        // Optional: Add props here
        id: {
            type: Number,
            required: true,
        },
    },
    methods: {
        // Fetch data from API
        async fetchProduct() {
            try {
                const response: ApiResponse<any> = await api.get(`product/${this.id}`); 
                if (response.status) {
                    this.product = response.data;
                } else {
                    this.error = response.message || "Failed to fetch data";
                }
            } catch (err) {
                this.error = "An error occurred while fetching data.";
                console.error(err);
            } finally {
                this.loading = false;
            }
        },

        // Format date to a more readable format
        formatDate(dateString: string) {
            const date = new Date(dateString);
            return date.toLocaleString(); // Adjust formatting as needed
        },
    },
    created() {
        this.fetchProduct();
    },
};
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>