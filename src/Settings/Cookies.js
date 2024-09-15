// import CookieManager from "../Modules/CookieManager";
import COMPANY from "./COMPANY";

// const cookieManager = new CookieManager();

export const cookieStateBP = {
  necessary: false,
  preferences: false,
  statistics: false,
  marketing: false,
  unclassified: false,
  consented: false,
};

export const CookieSlug = {
  session: "b_Sc",
  cc: "_cc",
  oauth: "_abck",
  auth: "ak_a",
  csrf: "xfs_r",
  // categories: "L_CD",
  // products: "AA_PvAC",
  username: "aC_us",
};

const Cookies = [
  {
    name: "necessary",
    required: true,
    data: [
      {
        provider: COMPANY.name,
        policy: "/policy",
        cookies: [
          {
            slug: CookieSlug.session,
            description: "session_desc",
            max_storage_period: "session",
            unit: null,
            type: "HTTP-Cookie",
          },
          {
            slug: CookieSlug.csrf,
            description: "session_desc",
            max_storage_period: 2,
            unit: "hours",
            type: "HTTP-Cookie",
          },
          {
            slug: CookieSlug.oauth,
            description: "auth_desc",
            max_storage_period: 10,
            unit: "days",
            type: "HTTP-Cookie",
          },
          {
            slug: CookieSlug.auth,
            description: "auth_desc",
            max_storage_period: 10,
            unit: "days",
            type: "HTML Local Storage",
          },
          {
            slug: CookieSlug.cc,
            description: "cc_desc",
            max_storage_period: 6,
            unit: "months",
            type: "HTTP-Cookie",
          },
          {
            slug: CookieSlug.username,
            description: "saved_user_values",
            max_storage_period: "resistant",
            unit: null,
            type: "HTML Local Storage",
          },
        ],
      },
    ],
  },
  {
    name: "preferences",
    required: false,
    data: [
      // {
      //   provider: COMPANY.name,
      //   policy: "/policy",
      //   cookies: [
      //     {
      //       slug: CookieSlug.categories,
      //       description: "category_version",
      //       max_storage_period: 30,
      //       unit: "days",
      //       type: "HTTP-Cookie",
      //     },
      //     {
      //       slug: `${
      //         cookieManager.getCookie(CookieSlug.categories) ||
      //         CookieSlug.categories
      //       }`,
      //       description: "saved_categories",
      //       max_storage_period: "resistant",
      //       unit: null,
      //       type: "HTML Local Storage",
      //     },
      //     {
      //       slug: CookieSlug.products,
      //       description: "product_version",
      //       max_storage_period: 30,
      //       unit: "days",
      //       type: "HTTP-Cookie",
      //     },
      //     {
      //       slug: `${
      //         cookieManager.getCookie(CookieSlug.products) ||
      //         CookieSlug.products
      //       }`,
      //       description: "saved_products",
      //       max_storage_period: "resistant",
      //       unit: null,
      //       type: "HTML Local Storage",
      //     },
      //     {
      //       slug: CookieSlug.username,
      //       description: "saved_user_values",
      //       max_storage_period: "resistant",
      //       unit: null,
      //       type: "HTML Local Storage",
      //     },
      //   ],
      // },
    ],
  },
  {
    name: "statistics",
    required: false,
    data: [],
  },
  {
    name: "marketing",
    required: false,
    data: [],
  },
  {
    name: "unclassified",
    required: false,
    data: [],
  },
];

export default Cookies;
