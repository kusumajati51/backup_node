<script setup lang="ts">
import api from '@/axios';
import type { NewProductRequest } from '@/models/request/NewProduct.model';
import type { VForm } from 'vuetify/lib/components/index.mjs';

</script>
<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" class="mr-2 bg-primary " text="New Product" variant="flat"></v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">New Product</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field v-model="product.name" label="Name" :rules="[rules.required]" required></v-text-field>
                    <v-text-field v-model="product.stock" label="Stock" :rules="[rules.required, rules.number]" required
                        type="number"></v-text-field>
                    <v-text-field v-model="product.price" label="Price" :rules="[rules.required, rules.number]" required
                        type="number"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeDialog" variant="flat">Cancel</v-btn>
                <v-btn color="primary" text @click="saveProduct" variant="flat">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">

export default {
    data() {
        return {
            dialog: false,
            valid: false,
            product: {} as NewProductRequest   ,
            rules: {
                required: (value: any) => !!value || 'Required.',
                number: (value: number) => !isNaN(value) || 'Must be a number.',
            },
        };
    },
    methods: {
        closeDialog() {
            this.dialog = false;
        },
        async saveProduct() {
            if ((this.$refs.form as { validate: () => boolean }).validate()) {
                // Handle the save logic here
                this.product.stock = Number(this.product.stock);
                this.product.price = Number(this.product.price);
                await api.post('product', this.product).then((res) => {
                    this.$emit('product-saved', this.product);
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