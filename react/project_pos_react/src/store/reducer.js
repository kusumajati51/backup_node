import { combineReducers } from 'redux'
import { ADD_CART, DECREASE_QUANTITY, DELETE_CART, GET_ALL_PRODUCT, GET_NUMBER_CART, INCREASE_QUANTITY } from './action'

const initProduct = {
    numberCart: 0,
    carts: [],
    _products: []
}

function todoProduct(state = initProduct, action) {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                _products: action.payload
            }
        case GET_NUMBER_CART:
            return {
                ...state
            }
        case ADD_CART:
            if (state.numberCart == 0) {
                let cart = {
                    sku_id: action.payload.id,
                    quatity: 1,
                    name: action.payload.product.name
                }
                state.Carts.push(cart);

            }
            else {
                let check = fasle;
                state.Carts.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.Carts[key].quantity++;
                        check = true;
                    }
                });
                if (!check) {
                    let _cart = {
                        sku_id: action.payload.id,
                        quatity: 1,
                        name: action.payload.product.name
                    }
                    state.Carts.push(_cart);
                }
            }
            return {
                ...state,
                numberCart: state.numberCart + 1
            };
        case INCREASE_QUANTITY:
            state.numberCart++
            state.Carts[action.payload].quantity++;

            return {
                ...state
            }
        case DECREASE_QUANTITY:
            let quantity = state.Carts[action.payload].quantity;
            if (quantity > 1) {
                state.numberCart--;
                state.Carts[action.payload].quantity--;
            }

            return {
                ...state
            }
        case DELETE_CART:
            let quantity_ = state.Carts[action.payload].quantity;
            return {
                ...state,
                numberCart: state.numberCart - quantity_,
                Carts: state.Carts.filter(item => {
                    return item.id != state.Carts[action.payload].id
                })

            }
        default:
            break;
    }
}

const ShopApp = combineReducers({
    _todoProduct:todoProduct
});
export default ShopApp