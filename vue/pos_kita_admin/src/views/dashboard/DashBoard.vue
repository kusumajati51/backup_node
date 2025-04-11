<script setup lang="ts">
import ProfitExpanse from "@/components/dashboards/ProfitExpense.vue";
import TrafficDistribution from "@/components/dashboards/TrafficDistribution.vue";
import ProductSales from "@/components/dashboards/ProductSales.vue";
import UpcommingSchedule from "@/components/dashboards/UpcommingSchedule.vue";
import TopPayingClients from "@/components/dashboards/TopPayingClients.vue";
import ProductCards from "@/components/dashboards/ProductCards.vue";
import GrowthSalesCard from "@/components/dashboards/new/GrowthSalesCard.vue";
import TotalSalesCard from "@/components/dashboards/new/TotalSalesCard.vue";
import TotalGrowthSales from "@/components/dashboards/new/TotalGrowthSales.vue";
</script>
<template>
    <v-row>
        <v-col cols="12" sm="12" lg="8">
            <GrowthSalesCard />
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <div class="mb-6">
                <TotalSalesCard />
            </div>
            <div>
                <TotalGrowthSales />
            </div>
        </v-col>

        <v-col>
            <v-card elevation="10" class="pb-2">
                <v-card-item class="pa-6">
                    <div class="d-flex align-center justify-space-between">
                        <div>
                            <h5 class="text-h5 mb-1 font-weight-semibold"> Top 5 Sale</h5>
                        </div>
                    </div>
                    <v-data-table title="Top 5 Sale " class="month-table" :headers="headers" :items="orderList"
                        item-key="name" hide-default-footer>
                        <template #bottom></template>
                        <template v-slot:[`item.id`]="{ index }">
                            {{ index + 1 }}
                        </template>
                    </v-data-table>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import api from '@/axios';
import { VDataTable } from 'vuetify/lib/labs/components.mjs';
import UiParentCard from '@/components/shared/UiParentCard.vue';

export default {
    name: 'DashBoard',
    async mounted() {
        await this.loadData()
    },
    components: {
        VDataTable,
        UiParentCard
    },
    data() {
        return {
            orderList: [],
            headers: [
                {
                    title: 'Nomer',
                    align: 'center',
                    sortable: false,
                    value: 'id',
                },
                {
                    title: 'Product Name',
                    align: 'center',
                    sortable: false,
                    value: 'name',
                },
                {
                    title: 'Total Item',
                    align: 'center',
                    sortable: false,
                    value: 'total_item',
                },
                {
                    title: 'Total Price',
                    align: 'center',
                    sortable: false,
                    value: 'total_all_price',
                }
            ],
            meta: {
                page: 1,
                limit: 5,
                search: '',
                sort: 'id',
                order: 'desc'
            }
        }
    },
    methods: {
        async loadData() {
            var res: any = await api.get('order/count', { params: { ...this.meta } })
            this.orderList = res.data
        }
    }
}
</script>