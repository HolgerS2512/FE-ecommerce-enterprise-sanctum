import CookieManager from "../Modules/CookieManager";
import COMPANY from "./COMPANY";

const cookieManager = new CookieManager();

export const CookieSlug = {
  session: "xFs_csL",
  auth: "xFs_at",
  categories: "L_CD",
  products: "AA_PvAC",
  username: "aC_us",
};

const Cookies = [
  {
    name: "necessary",
    data: [
      {
        provider: COMPANY.name,
        cookies: [
          {
            slug: CookieSlug.session,
            description: "session_desc",
            max_storage_period: "session",
            unit: null,
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
            slug: CookieSlug.categories,
            description: "versionsnummer der categorien",
            max_storage_period: 30,
            unit: "days",
            type: "HTTP-Cookie",
          },
          {
            slug: `${
              cookieManager.getCookie(CookieSlug.categories) ||
              CookieSlug.categories
            }`,
            description: "speichert das eigentliche layout",
            max_storage_period: "resistant",
            unit: null,
            type: "HTML Local Storage",
          },
          {
            slug: CookieSlug.products,
            description: "versionsnummer der categorien",
            max_storage_period: 30,
            unit: "days",
            type: "HTTP-Cookie",
          },
          {
            slug: `${
              cookieManager.getCookie(CookieSlug.products) ||
              CookieSlug.products
            }`,
            description: "speichert das eigentliche layout",
            max_storage_period: "resistant",
            unit: null,
            type: "HTML Local Storage",
          },
          {
            slug: CookieSlug.username,
            description: "speichert aus layout zwecken den vornamen",
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
    data: [{}],
  },
  {
    name: "statistics",
    data: [{}],
  },
  {
    name: "marketing",
    data: [{}],
  },
  {
    name: "unclassified",
    data: [{}],
  },
];

export default Cookies;
