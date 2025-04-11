<template>
    <v-card elevation="10" class="withbg">
        <v-card-item>
            <div class="d-flex align-center justify-space-between pt-sm-2">
                <v-card-title class="text-h5">Product Sales</v-card-title>
                <v-btn size="small" icon class="bg-success">
                    <v-avatar size="20" class="text-surface">
                        <IconCash size="20" />
                    </v-avatar>
                </v-btn>
            </div>
            <v-row>
                <v-col cols="12">
                    <div class="mt-2">
                        <h3 class="text-h4">{{totalSales}}</h3>
                        <div class="mt-2">
                            <v-avatar v-if="notationGrowth == '+'" class="bg-lightsuccess text-accent" size="20">
                                <ArrowUpRightIcon class="text-success" size="15" />
                            </v-avatar>
                            <v-avatar v-else class="bg-lighterror text-accent" size="20">
                                <ArrowDownRightIcon class="text-error" size="15" />
                            </v-avatar>
                            <span class="text-subtitle-1 ml-2 font-weight-bold">{{
                                `${notationGrowth}${growthPercentage}%`}}</span>
                            <span class="text-subtitle-1 text-muted ml-2">last day</span>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
        <div class="mt-3">
            <apexchart type="area" height="60" :options="areachartOptions" :series="areaChart.series"> </apexchart>
        </div>
    </v-card>
</template>

<script lang="ts">
import api from '@/axios';
import { ref } from 'vue';
import { computed } from 'vue';
import { useTheme } from 'vuetify';
import { IconCash } from '@tabler/icons-vue';
export default {
    name: 'ProductSales',
    components: {
        IconCash,
    },
    setup() {
        const theme = useTheme();
        const indigo = theme.current.value.colors.indigo;
        return { indigo };
    },
    data: () => ({
        areachartOptions: {
            chart: {
                id: "sparkline3",
                type: "area",
                height: 60,
                sparkline: {
                    enabled: true,
                },
                group: "sparklines",
                fontFamily: 'inherit',
                foreColor: "#adb0bb",
            },
            stroke: {
                curve: "smooth",
                width: 2,
            },
            fill: {
                colors: ["#f3feff"],
                type: "solid",
                opacity: 0.05,
            },

            markers: {
                size: 0,
            },
            tooltip: {
                theme: "dark",
                fixed: {
                    enabled: true,
                    position: "right",
                },
                x: {
                    show: false,
                },
            },
        },
        areaChart: {
            series: [] as Array<{ name: string; data: number[] }>
        },
        totalSales: "0",
        growthPercentage: 0,
        notationGrowth: "+",
    }),
    async mounted() {
        await this.getSalesData();
    },

    methods: {
        async getSalesData() {
            // Fetch sales data from the API or any other source
            // and update the areaChart.series data accordingly.
            var respose = await api.get('order/sales/statistics');
            var data = respose.data;  
            var salesStatistics = data.sales_statistics;
            this.growthPercentage = data.growth_percentage;
            if (this.growthPercentage < 0) {
                this.notationGrowth = "-";
                this.growthPercentage = Math.abs(this.growthPercentage);
            } else {
                this.notationGrowth = "+";
            }
            this.totalSales = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
            }).format(data.total_sales);
            if (salesStatistics) {
                this.areaChart.series = [
                    {
                        name: "Sales",
                        data: salesStatistics.map((item: { total_sales: string | number }) => Number(item.total_sales)),
                    },
                ];

              console.log(this.areaChart.series);  
            } else {
                console.error("Data penjualan kosong atau tidak valid");
            }
        }
    }
};
</script>
