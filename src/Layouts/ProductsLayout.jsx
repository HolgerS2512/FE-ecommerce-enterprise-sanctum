import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";
import { useLayoutContext } from "../Contexts/LayoutProvider";

import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";

const STALETIME = 1000 * 60 * 5; // 5 Minutes
const CACHETIME = 1000 * 60 * 15; // 15 Minutes

const ProductsLayout = ({ id }) => {
  // Common
  const { isLoading, setIsLoading, setHasError } = useOutletContext();
  const { products, setProducts } = useLayoutContext();
  const location = useLocation();
  // Kernel
  const dynamicKey = `category_${id}`;
  const checkObj = Object.keys(products[dynamicKey] ?? {});
  const hasData = Boolean(checkObj).length;
  // Chache
	const { data, isLoading: isDataLoading, error } = useQuery({
		queryKey: [dynamicKey],
		queryFn: () => axiosClient.get(`${ROUTES.request.CATEGORIES}/${id}`),
		staleTime: STALETIME,
		cacheTime: CACHETIME,
		enabled: !hasData, // Execute only if condition is met
	});

  useEffect(() => {
    const pLength = Object.keys(products[dynamicKey] ?? {}).length;
    if (Boolean(pLength)) {
      setIsLoading(false);
    } else {
      loadData();
    }
  }, [location.pathname, isLoading, isDataLoading]);

  const loadData = async () => {
    if (data && !isDataLoading && error === null) {
      setProducts(dynamicKey, data.data.data);
      setIsLoading(false);
    } else if (error && !isDataLoading) {
      setHasError(error);
    }
  }

  // useEffect(() => {
  //   if (Object.keys(products).length && products[id]) {
  //     isLoading && setIsLoading(false);
  //   }
  // }, [products, location.pathname, isLoading]);

  return (
    <>
      <h1>ProductsLayout { id }</h1>

      {
        products[dynamicKey] && products[dynamicKey].map((product, i) => (
          <div key={i}>
            {/* {console.log(product)} */}
            <p className="ms-5">{product.article_number}</p>
          </div>
        ))
      }
    </>
  )
}

export default ProductsLayout