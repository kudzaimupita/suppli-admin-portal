import Index from './views/Index.js';
import Profile from './views/examples/Profile.js';
import SubCatergories from './views/examples/SubCatergories';
import Catergories from './views/examples/Catergories';
import Maillist from './views/examples/Maillist.js';

import Products from './views/examples/Products.js';
import Plugs from './views/examples/Plugs';
import Payments from './views/examples/Payments';
import PlugReviews from './views/examples/ShopReviews';
import ProductReviews from './views/examples/ProductReviews';

import Refunds from './views/examples/Refunds.js';
import ProductDetails from './pages/ProductDetails';

import Users from './views/examples/Tables.js';

var routes = [
  {
    path: '/index',
    name: 'Overview',
    icon: 'ni ni-tv-2 text-success',
    component: Index,
    layout: '/admin',
  },

  {
    path: '/orders',
    name: 'Orders',
    icon: 'ni ni-single-copy-04 text-yellow',
    component: Profile,
    layout: '/admin',
  },
  {
    path: '/plugs',
    name: 'Stores',
    icon: 'ni ni-shop text-red',
    component: Plugs,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'Users',
    icon: 'ni ni-single-02 text-success',
    component: Users,
    layout: '/admin',
  },

  {
    path: '/products',
    name: 'Products',
    icon: 'ni ni-bag-17 text-info',
    component: Products,
    layout: '/admin',
  },

  {
    path: '/subCatergories',
    name: 'SubCatergories',
    icon: 'ni ni-ungroup text-primary',
    component: SubCatergories,
    layout: '/admin',
  },
  {
    path: '/catergories',
    name: 'Catergories',
    icon: 'ni ni-ungroup text-warning',
    component: Catergories,
    layout: '/admin',
  },

  {
    path: '/product-reviews',
    name: 'Product reviews',
    icon: 'ni ni-chat-round text-danger',
    component: ProductReviews,
    layout: '/admin',
  },
  // {
  //   path: '/shop-reviews',
  //   name: 'Shop reviews',
  //   icon: 'ni ni-chat-round text-success',
  //   component: PlugReviews,
  //   layout: '/admin',
  // },

  {
    path: '/maillist',
    name: 'Mail-list',
    icon: 'ni ni-email-83 text-info',
    component: Maillist,
    layout: '/admin',
  },
  // {
  //   path: '/payments',
  //   name: 'Payments',
  //   icon: 'ni ni-collection text-primary',
  //   component: Payments,
  //   layout: '/admin',
  // },
  // {
  //   path: '/media',
  //   name: 'Media',
  //   icon: 'ni ni-settings-gear-65 text-primary',
  //   component: Maillist,
  //   layout: '/admin',
  // },
  {
    path: '/product/:id',
    // name: "Settings",
    // icon: "ni ni-settings-gear-65 text-primary",
    component: ProductDetails,
    layout: '/admin',
  },
];
export default routes;
