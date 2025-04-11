interface DetailOrderInterface {
    id: number;
    code_order: string;
    created_at: Date;
    total_item: number;
    total_price: number;

}
export class DetailOrder implements DetailOrderInterface {
    id!: number;
    code_order!: string;
    created_at!: Date;
    total_item!: number;
    total_price!: number;
}