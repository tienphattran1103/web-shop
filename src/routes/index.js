import Home from '~/pages/Home';
import Catalog from '~/pages/Catalog';
import Cart from '~/pages/Cart';
import Product from '~/pages/Product';

//  Public Routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/catalog', component: Catalog },
    { path: '/cart', component: Cart },
    { path: '/catalog/:slug', component: Product },
];

// Private Routes for logged in users
const privateRoutes = [];

export { publicRoutes, privateRoutes };
