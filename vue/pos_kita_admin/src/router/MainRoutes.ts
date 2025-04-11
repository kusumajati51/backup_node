
const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'New Dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/DashBoard.vue')
        },
        {
            name: 'Alert',
            path: '/ui/alerts',
            component: () => import('@/views/ui-components/Alerts.vue')
        },
        {
            name: 'Buttons',
            path: '/ui/buttons',
            component: () => import('@/views/ui-components/Buttons.vue')
        },
        {
            name: 'Cards',
            path: '/ui/cards',
            component: () => import('@/views/ui-components/Cards.vue')
        },
        {
            name: 'Tables',
            path: '/ui/tables',
            component: () => import('@/views/ui-components/Tables.vue')
        },
        {
            name: 'Icons',
            path: '/icons',
            component: () => import('@/views/pages/Icons.vue')
        },
        {
            name: 'Starter',
            path: '/sample-page',
            component: () => import('@/views/pages/SamplePage.vue')
        },
        {
            name: 'product',
            path: '/product',
            component: () => import('@/views/product/ProductList.vue')
        },
        {
            name: 'shop',
            path: '/shop',
            component: () => import('@/views/shop/ShopList.vue')
        },
        {
            name: 'cart',
            path: '/cart',
            component: () => import('@/views/shop/CartList.vue')
        },
        {
            name: 'history',
            path: '/history',
            component: () => import('@/views/shop/History.vue')
        },
        {
            name: 'order details',
            path: '/order/details/:id',
             component: () => import('@/views/shop/DetailsHistory.vue')
        },
        {
            name: 'Sku List',
            path: '/product/sku/:id',
            component: () => import('@/views/product/SkuList.vue')
        }
    ]
    
};

export default MainRoutes;
