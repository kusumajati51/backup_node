import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import ShopApp from "./reducer";

const shop = configureStore(ShopApp, applyMiddleware(thunkMiddleware))
export default shop;