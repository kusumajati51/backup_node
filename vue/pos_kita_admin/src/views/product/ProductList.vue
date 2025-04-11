<script setup lang="ts">
import type { Product } from '@/models/response/Product.model';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import NewProduct from '@/components/forms/dialog/NewProduct.vue';
import api from '@/axios';
import AddProductPhoto from '@/components/forms/dialog/AddProductPhoto.vue';
import IconImageAvatar from '@/components/ui-components/img/IconImageAvatar.vue';
import NotFoundAvatar from '@/components/ui-components/img/NotFoundAvatar.vue';
import { VDataTableServer } from 'vuetify/lib/labs/components.mjs';
import SelectPicture from '@/components/forms/dialog/SelectPicture.vue';
import UploadProductPhoto from '@/components/forms/dialog/UploadProductPhoto.vue';
import ImageActionDialog from '@/components/forms/dialog/ImageActionDialog.vue';
import UpdateProduct from '@/components/forms/dialog/UpdateProduct.vue';
import ImportProductExcel from '@/components/forms/dialog/ImportPrductExcel.vue';
import { IconSearch } from '@tabler/icons-vue';
</script>
<template>
    <UiParentCard title="List Product">
        <template v-slot:action>
            <div class="horizontal-layout">
                <NewProduct @product-saved="listProduct" />
                <ImportProductExcel :show-dialog="dialogImportProduct" @open="openDialogImportProduct"
                    @close="closeDialogImportProduct" @import-succesfull="listProduct" />
                <v-btn class="mr-2 bg-primary " variant="flat" @click="downloadFile">Download File</v-btn>
            </div>
        </template>
        <v-data-table-server class="mb-5" :headers="headers" :items="products" title="Product List"
            v-model:items-per-page="meta.limit" :items-length="meta.total_rows" :items-per-page-options="limitsOption"
            @update:options="updateProduct">

            <template v-slot:[`item.id`]="{ index }">
                {{ (index + 1) + (meta.limit * (meta.page - 1)) }}
            </template>

            <template v-slot:[`item.image`]="{ item }">
                <td>
                    <IconImageAvatar v-if="item.product_photo.length != 0" :base-url="url" :id="item.id" />
                    <NotFoundAvatar v-else />
                </td>

            </template>

            <template v-slot:[`item.action`]="{ item }">
                <td v-if="item.product_photo.length == 0">
                    <AddProductPhoto :showDialog="dialogUploadFromKomputer === item.id" :productId="item.id"
                        @photo-saved="listProduct" @close="dialogUploadFromKomputer = 0"
                        @open="dialogUploadFromKomputer = item.id" />
                </td>
                <td v-else>
                    <ImageActionDialog :productId="item.id" @select-picture="openSelectPicutre"
                        @upload-computer="openUploadPicture" />
                    <SelectPicture :showDialog="dialogSelectImage === item.id" :productId="item.id" :showButton="false"
                        @close="dialogSelectImage = 0" @open="dialogSelectImage = item.id" @photo-saved="photoSaved" />
                    <UploadProductPhoto :id="item.id" :showDialog="dialogUploadFromKomputer === item.id"
                        @close="dialogUploadFromKomputer = 0" @open="dialogUploadFromKomputer = item.id"
                        :productId="item.id" :showButton="false" @photo-saved="photoSaved" />
                </td>
                <td>
                    <v-tooltip :text="'Product Detail'">
                        <template v-slot:activator="{ props }">
                            <v-btn icon variant="text">
                                <router-link v-bind="props" :to="'/product/sku/' + item.id">
                                    <IconSearch stroke="2" />
                                </router-link>
                            </v-btn>
                        </template>
                    </v-tooltip>
                </td>
                <td>
                    <UpdateProduct :productId="item.id" :showDialog="dialogUpdateProduct === item.id"
                        @close="dialogUpdateProduct = 0" @open="dialogUpdateProduct = item.id"
                        @product-updated="productUpdated" />
                </td>
            </template>

        </v-data-table-server>
    </UiParentCard>
</template>

<script lang="ts">
export default {
    async mounted() {
        await this.listProduct()
    },
    components: {
        VDataTableServer
    },
    data() {
        return {
            products: [] as Product[],
            url: import.meta.env.VITE_API_URL + "product/photo/",
            altImageUrl: import.meta.env.VITE_API_URL + "picture_notfound",
            selectItemId: 0,
            dialogUploadFromKomputer: 0,
            dialogSelectImage: 0,
            dialogUpdateProduct: 0,
            dialogImportProduct: false,
            limitsOption: [
                { value: 5, title: '5' },
                { value: 10, title: '10' },
                { value: 20, title: '20' },
                { value: 50, title: '50' },
            ],
            headers: [
                {
                    title: 'ID',
                    align: 'center',
                    sortable: true,
                    value: 'id',
                },
                {
                    title: 'Product Name',
                    align: 'center',
                    sortable: true,
                    value: 'name',
                },
                {
                    title: 'Image',
                    align: 'right',
                    sortable: false,
                    value: 'image',
                },
                {
                    title: 'Code',
                    key: 'code_product',
                    sortable: true,
                },
                {
                    title: 'Action',
                    key: 'action',
                    sortable: false,
                },
            ],
            meta: {
                page: 1,
                limit: 5,
                total_rows: 0,
                order_by: "id",
                order: "asc"
            },
            fileUrl: import.meta.env.VITE_API_URL + "product/import/download-template",
            fileName: "product_template.xlsx",
        };
    },
    methods: {

        openDialogImportProduct() {
            this.dialogImportProduct = true
        },
        closeDialogImportProduct() {
            this.dialogImportProduct = false
        },
        openSelectPicutre(id: any) {
            this.dialogSelectImage = id
            this.dialogUploadFromKomputer = 0
            this.dialogUpdateProduct = 0
        },

        openUploadPicture(id: any) {
            this.dialogUploadFromKomputer = id
            this.dialogSelectImage = 0
            this.dialogUpdateProduct
        },
        openUpdateProduct(id: any) {
            this.dialogUpdateProduct = id
            this.dialogUploadFromKomputer = 0
            this.dialogSelectImage = 0
        },
        async photoSaved() {
            await this.listProduct()
            this.dialogUploadFromKomputer = 0
            this.dialogSelectImage = 0
            this.dialogUpdateProduct = 0
        },

        async productUpdated() {
            await this.listProduct()
            this.dialogUploadFromKomputer = 0
            this.dialogSelectImage = 0
            this.dialogUpdateProduct = 0
        },

        async listProduct() {
            this.products = [] as Product[]
            var res: any = await api.get('product', { params: { ...this.meta } })
            this.products = res.data
        
            // console.log(this.products)
            this.meta = res.meta
            this.closeDialogImportProduct()
        },
        async updateProduct(meta: any) {
            this.products = [] as Product[]
            this.meta.page = meta.page
            // this.meta.limit = meta.itemsPerPage
            if (meta.sortBy.length > 0) {
                this.meta.order_by = meta.sortBy[0].key
                this.meta.order = meta.sortBy[0].order
            }
            // console.log(this.meta)
            this.listProduct()
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

    },

}
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