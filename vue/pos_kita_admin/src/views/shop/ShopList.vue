<template>
    <div>
        <v-row>
            <v-col cols="12" lg="3" sm="6"  v-for="(product, i) in products" :key="i">
                <ProductItem :sku="product" @putChard="saveProduct" />
            </v-col>

        </v-row>
        <v-col>
            <v-pagination :length="meta.total_pages" v-model="page"></v-pagination>
        </v-col>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import ProductItem from '../../components/shop/ProductItem.vue';
// import api from '@/axios';
// import { useProductStore } from '../../store/products';
import { useCartStore } from '../../store/cart';
import { useSkuStore } from '@/store/sku';

const productStore = useSkuStore();
const cartStore = useCartStore()
let cProducts = computed(() => productStore.list);
let products = computed(() => cProducts.value);
let meta = computed(() => productStore.meta);

var page = ref(1)
var limit = ref(8)
onMounted(() => {
    productStore.fetchAll(limit.value, page.value)
    // console.log(meta)
})

function saveProduct(product: any) {
    cartStore.add(product)
}
watch(page, (newPage) => {
    productStore.fetchAll(limit.value, newPage);
    cProducts = computed(() => productStore.list);
    products = computed(() => cProducts.value)
    meta = computed(() => productStore.meta)
})
// export default {
//     components: { ProductItem },
//     data() {
//         return {
//             products: [] as any[]
//         };
//     },
//     async created() {
//         await this.listProduct();
//     },
//     methods: {
//         async listProduct() {
//             var d = await api.get('/product');
//             this.products = d.data;
//         }
//     }
// };
</script>
