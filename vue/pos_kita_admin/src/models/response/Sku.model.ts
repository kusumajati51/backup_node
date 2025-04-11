import { Product } from './Product.model';
interface SkuInterface {
    id: number;
    name: string;
    unit: number;
    price: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export class Sku implements SkuInterface {
    id!: number;
    name!: string;
    unit!: number;
    price!: number;
    product_id!: number;
    created_at!: string;
    updated_at!: string;
    product!: Product;
};
