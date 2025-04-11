<script setup lang="ts">
import api from '@/axios';
import { defineComponent } from 'vue';
import { VDataTable, VDataTableServer } from 'vuetify/lib/labs/components.mjs';
import { IconSearch } from '@tabler/icons-vue';

</script>
<template>
    <v-row class="month-table">
        <v-col cols="12" sm="12">
            <v-card elevation="10" class="bg-surface">
                <v-data-table-server class="mb-5" :headers="headers" :items="historyOrder"
                    :items-length="meta.total_rows" @update:options="updateItem">
                    <template v-slot:[`item.status`]="{ item }">
                        <td>
                            {{ checkOpenOrClose(item.created_at) }}
                        </td>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-tooltip :text="'Show Details Order '">
                            <template v-slot:activator="{ props }">

                                <v-btn icon variant="text">
                                    <router-link v-bind="props" :to="'/order/details/' + item.id">
                                        <IconSearch stroke="2" />
                                    </router-link>
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </template>
                </v-data-table-server>
            </v-card>
        </v-col>
    </v-row>
</template>
<script lang="ts">
export default defineComponent({
    data() {
        return {
            historyOrder: [],
            meta: {
                page: 1,
                limit: 10,
                total_rows: 3,
                order_by: "id",
                order: "asc"
            },
            headers: [
                {
                    title: 'Order ID',
                    align: 'center',
                    sortable: true,
                    value: 'id',
                },
                {
                    title: 'Order Code',
                    key: 'code_order',
                    sortable: true,
                },
                {
                    title: 'Created At',
                    key: 'created_at',
                    sortable: true,
                },
                {
                    title: 'Updated At',
                    key: 'updated_at',
                    sortable: true,
                },
                {
                    title: 'Total Price',
                    key: 'total_price',
                    sortable: true,
                },
                {
                    title: 'Status',
                    key: 'status',
                    sortable: false,
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    sortable: false,
                },
            ],

        }
    },
    methods: {
        async loadItems() {
            var res: any = await api.get('order', { params: { ...this.meta } })
            this.historyOrder = res.data
            this.meta = res.meta
            // console.log(this.meta)
        },
        async updateItem(meta: any) {
            this.historyOrder = []
            this.meta.page = meta.page
            this.meta.limit = meta.itemsPerPage
            if (meta.sortBy.length > 0) {
                this.meta.order_by = meta.sortBy[0].key
                this.meta.order = meta.sortBy[0].order
            }
            // console.log(this.meta)
            this.loadItems()
        },
        checkOpenOrClose(dateString: string): string {
            // Parse the date string into a Date object
            let date = new Date(dateString);

            // Get the hour in 24-hour format
            let hour = date.getUTCHours();

            // Check if the time is more than or equal to 15:00
            if (hour >= 15) {
                return "Close";
            } else {
                return "Open";
            }
        }
    },
    mounted() {
        this.meta = {
            page: 1,
            limit: 10,
            total_rows: 3,
            order_by: "id", // add this property
            order: "asc"
        }
        this.loadItems()
    }
})

</script>