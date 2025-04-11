import { Sku } from './response/Sku.model';

export interface OrderListDetail {
    id: number;
    quantity: number;
    order_id: number;
    price: number;
    sku_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    sku: Sku;
}