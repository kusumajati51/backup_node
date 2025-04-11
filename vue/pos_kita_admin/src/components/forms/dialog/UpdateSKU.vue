<script setup lang="ts">
import api from '@/axios';
import type ApiResponse from '@/models/ApiResponse.model';
import type { NewSKURequest } from '@/models/request/NewSKU.model';
import type { VForm } from 'vuetify/lib/components/index.mjs';
import { IconEdit } from '@tabler/icons-vue';

</script>
<template>
    <div>
        <v-tooltip text="Update SKU" bottom>
            <template v-slot:activator="{ props }">
                <div v-bind="props">
                    <v-btn @click="openDialog" icon variant="text">
                        <IconEdit stroke-width="1.5" />
                    </v-btn>
                </div>
            </template>
        </v-tooltip> <v-dialog v-model="showDialog" max-width="500px">

            <v-card>
                <v-card-title>
                    <span class="headline">New Product</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field v-model="sku.name" label="Name" :rules="[rules.required]" required></v-text-field>
                        <v-text-field v-model="sku.unit" label="Unit" :rules="[rules.required, rules.number]" required
                            type="number"></v-text-field>
                        <v-text-field v-model="sku.price" label="Price" :rules="[rules.required, rules.number]" required
                            type="number"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeDialog" variant="flat">Cancel</v-btn>
                    <v-btn color="primary" text @click="updateProductSku" variant="flat">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- //user_id = 39918 -->
    </div>
</template>

<script lang="ts">

export default {
    props: {
        skuId: Number,
        showDialog: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['close', 'open', 'sku-updated'],

    data() {
        return {
            valid: false,
            error: "",
            sku: {} as NewSKURequest,
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
            await this.fetchProductSku()
            this.$emit('open');
        },
        async fetchProductSku() {
            try {
                const response = await api.get(`product/sku/find/${this.skuId}`) as ApiResponse<any>;
                if (response.status) {
                    this.sku.name = response.data.name;
                    this.sku.unit = response.data.unit;
                    this.sku.price = response.data.price;
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
        async updateProductSku() {
            if ((this.$refs.form as { validate: () => boolean }).validate()) {
                // Handle the save logic here
                this.sku.unit = Number(this.sku.unit);
                this.sku.price = Number(this.sku.price);
                await api.patch(`product/sku/${this.skuId}`, this.sku).then((res) => {
                    this.$emit('sku-updated', this.sku);
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