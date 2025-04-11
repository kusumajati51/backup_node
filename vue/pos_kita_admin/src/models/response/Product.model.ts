import { Sku } from "./Sku.model";
import { PhotoProduct } from "./PhotoProduct.request.model";
interface ProductInterface {
    id: number;
    name: string;
    code_product: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    sku: Sku[];
    product_photo: PhotoProduct[];
}

export class Product implements ProductInterface {
    id!: number;
    name!: string;
    code_product!: string;
    user_id!: number;
    created_at!: string;
    updated_at!: string;
    sku!: Sku[];
    product_photo!: PhotoProduct[];


}

