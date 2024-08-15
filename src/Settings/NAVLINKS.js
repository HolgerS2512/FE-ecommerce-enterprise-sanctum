import ROUTES from "./ROUTES";


const NAVLINKS = {
  // Profile routes
  profile: {
    name: 'account',
    links: {
      OVERVIEW: {
        name: 'overview',
        link: ROUTES.account.OVERVIEW,
      },
      PROFILE: {
        name: 'personal_profile',
        link: ROUTES.account.PROFILE,
      },
      ORDERS: {
        name: 'orders',
        link: ROUTES.account.ORDERS,
      },
      ADDRESSES: {
        name: 'addresses',
        link: ROUTES.account.ADDRESSES,
      },
      PAYMENTMETHODS: {
        name: 'payment_methods',
        link: ROUTES.account.PAYMENTMETHODS,
      },
    },
    icon: 'Profile',
  },
  // Main menu routes
  menu: {
    SALE: {
      name: 'sale',
      link: ROUTES.pages.SALE,
    },
    NEW: {
      name: 'new',
      link: ROUTES.pages.NEW,
    },
  },
  // Secondary routes
  submenu: {
    WISHLIST: {
      name: 'wishlist',
      link: ROUTES.account.WISHLIST,
      icon: 'Heart',
    },
    SHOPPINGCARD: {
      name: 'shopping_cart',
      link: ROUTES.external.SHOPPINGCARD,
      icon: 'ShoppingCard',
    }
  },
  // Service/Help routes
  extra: {
    name: 'servicehelper',
    links: {
      IMPRINT: {
        name: 'imprint',
        link: ROUTES.pages.IMPRINT,
      },
      PRIVACY: {
        name: 'data_protection',
        link: ROUTES.pages.PRIVACY,
      },
      TOU: {
        name: 'agbs',
        link: ROUTES.pages.TOU,
      },
      CANCELLATIONPOLICY: {
        name: 'cancellation_policy',
        link: ROUTES.pages.CANCELLATIONPOLICY,
      },
      SHIPPINGPAYMENT: {
        name: 'payment_shipping',
        link: ROUTES.pages.SHIPPINGPAYMENT,
      },
    },
    icon: 'ServiceHelp',
  },
  // Footer routes
  footer: {},
}

export default NAVLINKS;
