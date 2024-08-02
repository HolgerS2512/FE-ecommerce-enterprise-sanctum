const ROUTES = {
  // Authenticate
  auth: {
    LOOKUP: '/lookup_account',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REGISTER: '/register',
    VERIFYEMAIL: '/email/verify',
    FORGETPWD: '/forget/password',
    RESETPWD: '/reset/password',
    UPDATETOKEN: '/update/verify/token',
  },
  // Account
  account: {
    route: '/account',
    OVERVIEW: '/account',
    PROFILE: '/account/profile',
    ORDERS: '/account/orders',
    WISHLIST: '/wishlist',
    ADDRESS: '/account/address',
    PAYMENTMETHODS: '/account/payment',
    // Password Methods
    PASSWORD: {
      EDIT: '/edit/password',
      UPDATE: '/update/password',
    },
    // Email Methods
    EMAIL: {
      EDIT: '/edit/email',
      UPDATE: '/update/email',
    },
    // Personal Methods
    DATA: {
      UPDATE: '/update/user/personal/data',
    },
  },
  // External
  external: {
    SHOPPINGCARD: '/shopping_card',
  },
  // Pages
  pages: {
    // Common
    CATEGORIES: '/all/categories',
    HOME: '/',
    SALE: '/sale',
    NEW: '/new',
    // Service/Help
    IMPRINT: '/imprint',
    PRIVACY: '/privacy_policy',
    TOU: '/terms_of_use',
    CANCELLATIONPOLICY: '/cancellation_policy',
    SHIPPINGPAYMENT: '/shipping_and_payment',
    CONTACT: '/contact',
  },
  // Errors
  error: {
    NOTFOUND: '/404',
  },
}

export default ROUTES