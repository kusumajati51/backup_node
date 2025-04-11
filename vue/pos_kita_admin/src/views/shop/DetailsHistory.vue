<script setup lang="ts">
import api from '@/axios';
import BaseCard from '@/components/shared/BaseCard.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import type ApiResponse from '@/models/ApiResponse.model';
import type { DetailOrder } from '@/models/DetailOrder.model';
import type { OrderListDetail } from '@/models/OrderListDetail.model';
import { VDataTableServer, VDataTable } from 'vuetify/lib/labs/components.mjs';

</script>
<template>
    <div>
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <UiParentCard title="Detail Order">
                    <div>
                        <v-row class="d-flex align-items-start">
                            <v-col class="font-weight-bold pr-md-2">
                                Transaction Code
                            </v-col>
                            <v-col class="pl-md-2">
                                {{ detailOrderHistory.code_order }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="font-weight-bold pr-2">
                                Total Item
                            </v-col>
                            <v-col class="pl-md-2">
                                {{ detailOrderHistory.total_item }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="font-weight-bold pr-md-2">
                                Transaction Date
                            </v-col>
                            <v-col class="pl-md-2">
                                {{ new Date(detailOrderHistory.created_at).toLocaleDateString('en-GB',
                                { day: '2-digit', month: 'long', year: 'numeric' }) }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="font-weight-bold pr-md-2">
                                Transaction Time
                            </v-col>
                            <v-col class="pl-md-2">
                                {{ new Date(detailOrderHistory.created_at).toLocaleTimeString('en-GB',
                                { hour: '2-digit', minute: '2-digit' }) }}
                            </v-col>
                        </v-row>
                    </div>
                </UiParentCard>
            </v-col>
        </v-row>
        <v-row>~
            <v-col cols="12">
                <BaseCard>
                    <v-data-table-server class="mb-5" :headers="headers" :items="listOrder"
                        v-model:items-per-page="meta.limit" :items-length="meta.total_rows"
                        :items-per-page-options="limitsOption" @update:options="updateOrderList">
                        <template v-slot:tfoot>
                            <tr>
                                <th v-for="(col, i) in headers" :key="i">
                                    <v-divider></v-divider>
                                </th>
                            </tr>

                            <tr>
                                <th class="table-total"></th>
                                <th class="table-total"></th>
                                <th class="table-total"></th>
                                <th class="table-total">Total</th>
                                <th class="table-total">{{ detailOrderHistory.total_price}}</th>
                            </tr>
                            <tr>
                                <th v-for="(col, i) in headers" :key="i" >
                                    <v-divider class="divider_end"></v-divider>
                                </th>
                            </tr>
                        </template>

                    </v-data-table-server>

                </BaseCard>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
export default {        
    async mounted() {

        await this.fetchDetailHistory()
        await this.fetchOrderList()

    },
    data() {
        return {
            itemsPerPage: 5,
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
                    value: 'sku.product.name',
                },
                 {
                    title: 'SKU Name',
                    align: 'center',
                    sortable: true,
                    value: 'sku.name',
                },
                {
                    title: 'Price',
                    align: 'center',
                    sortable: true,
                    value: 'price',
                },
                {
                    title: 'Qty',
                    align: 'center',
                    sortable: true,
                    value: 'quantity',
                },
                {
                    title: 'Total Price',
                    align: 'center',
                    sortable: true,
                    value: 'total_price',
                },
            ],
            meta: {
                page: 1,
                limit: 5,
                total_rows: 0,
                order_by: "id",
                order: "asc"
            },
            detailOrderHistory: {} as DetailOrder,
            listOrder: [] as OrderListDetail[],
        }
    },
    methods: {
        async fetchDetailHistory() {
            var res: ApiResponse<DetailOrder> = await api.get('order/' + this.$route.params.id)
            this.detailOrderHistory = res.data
        },

        async fetchOrderList() {
            var res: ApiResponse<OrderListDetail[]> = await api
                .get('order/detail/list/' + this.$route.params.id,
                    { params: { ...this.meta } }
                )
            this.listOrder = res.data
            this.meta = res.meta
        },

        async updateOrderList(meta: any) {
            this.listOrder = [] as OrderListDetail[]
            this.meta.page = meta.page
            this.meta.limit = meta.itemsPerPage
            if (meta.sortBy.length > 0) {
                this.meta.order_by = meta.sortBy[0].key
                this.meta.order = meta.sortBy[0].order
            }
            // console.log(this.meta)
            this.fetchOrderList()
        },

    }
}
</script>

<style scoped>
.table-total {
    padding: 10px;
    margin: 5px;
}
.divider_end {
    margin: 0px 0px 20px 0;
}
</style>