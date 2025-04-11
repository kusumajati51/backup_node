import api from '@/axios';
import ApiResponse from '@/models/ApiResponse.model';
import { Meta } from '@/models/Meta.model';
import { Sku } from '@/models/response/Sku.model';
import { defineStore } from 'pinia';

interface SKUState {
    items: Record<string, Sku>;
    meta: Meta;
    ids: number[];
}

const useSkuStore = defineStore({
    id: 'sku',
    state: (): SKUState => ({
        items: {},
        meta: new Meta(),
        ids: []
    }),
    getters: {
        list(): Sku[] {
            return this.ids.map((id) => this.items[id]);
        },
        metaData(): any {
            return Object.keys(this.meta);
        }
    },
    actions: {
        async fetchAll(limit: number, page: number) {
            const res: ApiResponse<Sku[]> = await api.get('/product/sku/index', {
                params: {
                    limit,
                    page
                }
            });
            const data: Sku[] = res.data;
            this.setMeta(res.meta);
            this.ids = data.map((sku) => {
                this.items[sku.id] = sku;
                return sku.id
            })
        },
        setMeta(meta: Meta) {
            this.meta = meta;
        }
    }
});

export { useSkuStore };
