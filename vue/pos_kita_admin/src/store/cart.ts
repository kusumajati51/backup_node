import { defineStore } from 'pinia';
import { CART_STORAGE } from '../hooks';
import { useProductStore } from './products';

export interface Order {
    name: string;
    sku_id: number;
    product_id: number;
    quantity: number;
    price: number;
}

interface CartState {
    contents: Record<string, Order>;
}

export interface CartPreview {
    id: number;
    image: string;
    title: string;
    quantity: number;
    cost: number;
}

export const useCartStore = defineStore({
    id: 'cart',

    state: (): CartState => ({
        contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {}
    }),
    getters: {
        count(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity;
            }, 0);
        },
        list(): Order[] {
            const products = useProductStore();

            var cartOrderList = Object.keys(this.contents).map((sku_id) => {
                const purchase = this.contents[sku_id];
                return {
                    name: purchase.name,
                    sku_id: purchase.sku_id,
                    product_id: purchase.product_id,
                    quantity: purchase.quantity,
                    price: purchase.price
                };
            });
            return cartOrderList
        },
        total(): number {
            const products = useProductStore();
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].price * this.contents[id].quantity;
            }, 0);
        },
        countCoupon(): number {
            // var coupons = 0;
            // this.formattedCart.forEach((element) => {
            //     if (element.cost >= 50000) {
            //         console.log(element);
            //         coupons += 1;
            //     } else {
            //         if (coupons != 0) {
            //             coupons -= 1;
            //         }
            //     }
            // });
            // if (this.total >= 100000) {
            //     coupons += Math.floor(this.total / 100000);
            // } else {
            //     if (coupons != 0) {
            //         coupons -= 1;
            //     }
            // }
            return Object.keys(this.contents).reduce((acc, id) => {
                const products = useProductStore();
                var coupons = 0;
                if (products.items[id]) {
                    const purchase = this.contents[id].price * this.contents[id].quantity;
                    const total = acc + purchase;
                    if (purchase >= 50000) {
                        coupons += 1;
                    }
                    if (total >= 100000) {
                        coupons += Math.floor(total / 100000);
                    }
                    return coupons;
                }
                return coupons;
            }, 0);
        },
        formattedCart(): CartPreview[] {
            const products = useProductStore();

            // if (!products.loaded) return [];

            return Object.keys(this.contents).map((sku_id) => {
                const purchase = this.contents[sku_id];

                return {
                    id: purchase.sku_id,
                    image: import.meta.env.VITE_API_URL + 'product/photo/' + purchase.product_id,
                    title: purchase.name,
                    quantity: purchase.quantity,
                    cost: purchase.price * purchase.quantity
                };
            });
        }
    },
    actions: {
        add(sku: any) {
            if (this.contents[sku.id]) {
                this.contents[sku.id].quantity += 1;
            } else {
                this.contents[sku.id] = {
                    name: sku.product.name + " " + sku.name,
                    sku_id: sku.id,
                    product_id: sku.product.id,
                    quantity: 1,
                    price: sku.price
                };
            }
        },
        remove(product: any) {
            console.log(product);
            console.log(this.contents);
            if (!this.contents[product.id]) {
                console.log('nope');
                return;
            }

            this.contents[product.id].quantity -= 1;

            if (this.contents[product.id].quantity === 0) {
                delete this.contents[product.id];
            }
        },
        async deleteAllRecord() {
            await this.$reset();
            await localStorage.removeItem(CART_STORAGE);
            this.contents = {};
        }
    }
});
