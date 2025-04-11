<template>
    <v-card elevation="10" class="bg-surface">
        <v-card-item class="py-4 px-6">
            <v-card-title class="text-h5">Growth Sales</v-card-title>
        </v-card-item>
        <v-divider />
        <div class="mt-3">
            <apexchart type="bar" height="1470px" :options="chartOptions" :series="series"></apexchart>
        </div>
    </v-card>
</template>

<script lang="ts">
import { ref } from 'vue';
import api from '@/axios';
import type SalesData from '@/models/response/SalesData.request.model';
import { useTheme } from 'vuetify';
export default {

    setup() {
        const theme = useTheme();
        const primaryColor = ref(theme.current.value.colors.primary);
        /**
         * Initializes component state with theme colors.
         * 
         * @returns {Object} An object containing references to the primary and error colors of the current theme.
         */

        const errorColor = ref(theme.current.value.colors.error);

        return { primaryColor, errorColor };
    },
    data: () => ({
        series: [] as any[],
        chartOptions: {} as any,
        categories: [] as string[],
    }),

    async mounted() {
        await this.loadData();

        this.chartOptions = {
            grid: {
                borderColor: 'rgba(0,0,0,0.1)',
                strokeDashArray: 3,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Vertical bar chart
                    columnWidth: "25%", // Lebar kolom
                    borderRadius: [8], // Sudut membulat
                },
            },
            colors: [this.primaryColor, this.errorColor],
            chart: {
                fontFamily: 'inherit',
                type: "bar", // Tipe chart diubah ke bar
                height: 405,
                offsetY: 10,
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false, // Menampilkan nilai di atas batang
                // formatter: (val: number, { seriesIndex, dataPointIndex }: { seriesIndex: number, dataPointIndex: number }) => {
                //     return `${val} `;
                // },
                // offsetY: 0,
                // style: {
                //     fontSize: "12px",
                //     colors: ["#333"],
                // },
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                // Label untuk sumbu X (akan diisi dinamis)
                categories: this.categories,
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                labels: {
                    style: {
                        colors: "#a1aab2",
                    },
                },
            },
            yaxis: {
                title: {
                    text: "Total Sales  Unit", // Judul sumbu Y
                    style: {
                        fontSize: "14px",
                    },
                },
                labels: {
                    style: {
                        colors: "#a1aab2",
                    },
                },
            },
            tooltip: {
                theme: "dark",
                y: {
                    formatter: (val: number) => {
                        return `${val} unit`;
                    },
                },
            },
            legend: {
                show: true,
            },
            responsive: [
                {
                    breakpoint: 767,
                    options: {
                        stroke: {
                            show: false,
                            width: 5,
                            colors: ["transparent"],
                        },
                    },
                },
            ],
        };
    },
    methods: {
        async loadData() {
            try {
                const response = await api.get('/order/growth/date');
                const gSale: SalesData[] = response.data;

                if (!Array.isArray(gSale) || gSale.length === 0) {
                    console.error("Data penjualan kosong atau tidak valid");
                    return;
                }

                // Isi data series dan label untuk sumbu X
                this.series = [
                    {
                        name: "Yesterday  Sales",
                        data: gSale.map((item) => item.sales),
                    },
                    {
                        name: "New Sales",
                        data: gSale.map((item) => item.new_sales),
                    },
                ];

                // Isi label untuk sumbu X
                this.categories = gSale.map((item) => item.name);
            } catch (error) {
                console.error("Gagal memuat data:", error);
            }
        },
    },
};
</script>