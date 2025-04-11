import api from '@/axios';
import ApiResponse from '@/models/ApiResponse.model';
import { Meta } from '@/models/Meta.model';
import { Product } from '@/models/response/Product.model';
import { defineStore } from 'pinia';

interface ProductState {
    items: Record<string, Product>;
    meta: Meta;
    ids: number[];
}

const useProductStore = defineStore({
    id: 'products',
    state: (): ProductState => ({
        items: {},
        meta: {
            page: 0,
            limit: 0,
            total_rows: 0,
            total_pages: 0,
            has_previous_page: false,
            has_next_page: false
        },
        ids: []
    }),
    getters: {
        list(): Product[] {
            return this.ids.map((i) => this.items[i]);
        },
        loaded(): boolean {
            this.ids.map((i) => this.items[i]);
            console.log(this.ids);
            return this.ids.length > 0;
        },
        metaData(): any {
            return Object.keys(this.meta);
        }

    },

    actions: {
        async fetchAll(limit: number, page: number) {
            if (this.loaded) {

            }

            const res: ApiResponse<Product[]> = await api.get('/product', {
                params: {
                    limit,
                    page
                }
            });

            const data: Product[] = res.data;
            this.setMeta(res.meta);
            this.ids = data.map((product) => {
                this.items[product.id] = product;
                return product.id;
            });
        },
        setMeta(meta: Meta) {
            this.meta = meta;
        }
        // async
    }
});

export { useProductStore };
