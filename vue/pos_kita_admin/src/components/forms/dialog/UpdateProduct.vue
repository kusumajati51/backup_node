<script setup lang="ts">
import api from '@/axios';
import type ApiResponse from '@/models/ApiResponse.model';
import type { NewProductRequest } from '@/models/request/NewProduct.model';
import type { VForm } from 'vuetify/lib/components/index.mjs';
import { IconEdit } from '@tabler/icons-vue';
</script>
<template>
    <div>
        <v-tooltip text="Update Product" bottom>
            <template v-slot:activator="{ props }">
                <div v-bind="props">
                    <v-btn @click="openDialog" icon variant="text">
                        <IconEdit stroke-width="1.5" />
                    </v-btn>
                </div>
            </template>
        </v-tooltip>
        <v-dialog v-model="showDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">New Product</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="product.name" label="Name" :rules="[rules.required]"
                            required></v-text-field>
                        <div hidden>
                            <v-text-field v-model="product.stock" label="Stock" :rules="[rules.required, rules.number]"
                                required type="number" hidden></v-text-field>
                        </div>
                        <div hidden>
                            <v-text-field v-model="product.price" label="Price" :rules="[rules.required, rules.number]"
                                required type="number" hidden></v-text-field>
                        </div>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeDialog" variant="flat">Cancel</v-btn>
                    <v-btn color="primary" text @click="updateProduct" variant="flat">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">

export default {
    props: {
        productId: {
            type: Number,
            required: true,
        },
        showDialog: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['close', 'open', 'product-updated'],

    data() {
        return {
            valid: false,
            product: {} as NewProductRequest,
            error: "",
            loading: true,
            rules: {
                required: (value: any) => !!value || 'Required.',
                number: (value: number) => !isNaN(value) || 'Must be a number.',
            },
        };
    },
    methods: {
        closeDialog() {
            this.$emit('close');
        },
        async openDialog() {
            await this.fetchProduct() 
            this.$emit('open');
        },

        async fetchProduct() {
            try {
                const response = await api.get(`product/${this.productId}`) as ApiResponse<any>;
                if (response.status) {
                    this.product.name = response.data.name;
                    this.product.stock = 0;
                    this.product.price = 0;
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
        async updateProduct() {
            if ((this.$refs.form as { validate: () => boolean }).validate()) {
                // Handle the save logic here
                this.product.stock = Number(this.product.stock);
                this.product.price = Number(this.product.price);
                await api.patch(`product/+${this.productId}`, this.product).then((res) => {
                    this.$emit('product-updated', this.product);
                    const form = this.$refs.form as InstanceType<typeof VForm>;
                    form.reset();
                    this.closeDialog();
                }).catch((error) => {
                    console.error(error);
                    this.closeDialog();
                });

            }
        },
    },
};
</script>

<style scoped>
.headline {
    font-weight: bold;
}
</style>