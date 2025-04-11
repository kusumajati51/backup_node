<template>
    <div>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <ProductDetail :id="productId" />

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <UiParentCard title="List SKU">
                    <template v-slot:action>
                        <div class="horizontal-layout">
                            <NewSKU :productId="productId" @sku-saved="loaData" />
                            <ImportSkuExcel :showDialog="dialogImportSku" :product-id="productId"
                                @open="openDialogImportSku" @close="closeDialogImportSku" @import-succesfull="loaData" />
                            <v-btn class="mr-2 bg-primary " variant="flat" @click="downloadFile">Download File</v-btn>

                        </div>

                    </template>

                    <v-data-table-server :headers="headers" :items="skus" title="List" @update:options="updateProduct"
                        v-model:items-per-page="meta.limit" :items-length="meta.total_rows"
                        :items-per-page-options="limitsOption" :loading="isLoading">
                        <template v-slot:[`item.id`]="{ index }">
                            {{ (index + 1) + (meta.limit * (meta.page - 1)) }}
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <td>
                                <UpdateSKU :showDialog="dialogUpdateSKU === item.id" :skuId="item.id"
                                    @close="closeDialogUpdateSKU" @open="openDialogUpdateSKU(item.id)"
                                    @sku-updated="updateProductSku" />
                            </td>
                        </template>
                    </v-data-table-server>
                </UiParentCard>
            </v-col>
        </v-row>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api from '@/axios';
import { VDataTableServer } from 'vuetify/lib/labs/components.mjs';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import NewSKU from '@/components/forms/dialog/NewSKU.vue';
import ProductDetail from '@/components/shared/ProductDetail.vue';
import UpdateSKU from '@/components/forms/dialog/UpdateSKU.vue';
import ImportSkuExcel from '@/components/forms/dialog/ImportSkuExcel.vue';
import { update } from 'lodash';
export default defineComponent({
    components: {
        VDataTableServer,
        UiParentCard,
        NewSKU,
        ProductDetail,
        UpdateSKU,
        ImportSkuExcel
    },
    data() {
        return {
            skus: [],
            dialogUpdateSKU: 0,
            dialogImportSku: false,
            isLoading: false,
            limitsOption: [
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 20, title: '20' },
                { value: 50, title: '50' },
            ],
            headers: [
                { title: 'ID', value: 'id' },
                { title: 'Name', value: 'name' },
                { title: 'Price', value: 'price' },
                { title: 'Unit', value: 'unit' },
                { title: 'Action', value: 'action' },
                // { title: 'Stock', value: 'product.inventory.quantity', sortable: false },
            ],
            meta: {
                page: 1,
                limit: 5,
                total_rows: 0,
                order_by: "id",
                order: "asc"
            },
            productId: Number(this.$route.params.id),
            fileUrl: import.meta.env.VITE_API_URL + "product/sku/import/download-template",
            fileName: "sku_import_template.xlsx",
        };
    },
    async mounted() {
        this.productId = Number(this.$route.params.id);
        await this.loaData();
    },

    methods: {
        openDialogUpdateSKU(id: number) {
            this.dialogUpdateSKU = id;
        },
        closeDialogUpdateSKU() {
            this.dialogUpdateSKU = 0;
        },
        openDialogImportSku() {
            this.dialogImportSku = true;
        },
        closeDialogImportSku() {
            this.dialogImportSku = false;
        },
        async updateProductSku() {
            this.dialogUpdateSKU = 0;
            await this.loaData()
        },
        async updateProduct(meta: any) {
            this.skus = []
            this.meta.page = meta.page
            // this.meta.limit = meta.itemsPerPage
            if (meta.sortBy.length > 0) {
                this.meta.order_by = meta.sortBy[0].key
                this.meta.order = meta.sortBy[0].order
            }
            // console.log(this.meta)
            this.loaData()
        },
        async loaData() {
            this.isLoading = true
            try {
                const id = this.$route.params.id;
                var res: any = await api.get(`product/sku/index/${id}`, { params: { ...this.meta } })
                this.skus = res.data
                this.meta = res.meta

            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }

        },
        downloadFile() {
            // Define the file URL and file name

            // Create an invisible anchor element
            const link = document.createElement("a");
            link.href = this.fileUrl;
            link.download = this.fileName;

            // Append to the DOM, trigger click, and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
    }
});
</script>

<style>
.horizontal-layout {
    display: flex;
    gap: 10px;
    /* Optional: Adds space between the components */
    align-items: center;
    /* Optional: Aligns items vertically */
}
</style>