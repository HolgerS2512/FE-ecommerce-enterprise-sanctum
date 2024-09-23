import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";

import ROUTES from "../Settings/ROUTES";
import axiosClient from "../axios-clint";

const STALETIME = 1000 * 60 * 5; // 5 Minutes
const CACHETIME = 1000 * 60 * 15; // 15 Minutes

const ProductsLayout = ({ id }) => {
  // Common
  const { isLoading, setIsLoading, setHasError } = useOutletContext();
  const location = useLocation();
  // Kernel
  const [products, setProducts] = useState({});
  const dynamicKey = `category_${id}`;
  const checkObj = Object.keys(products[dynamicKey] ?? {});
  const hasData = Boolean(checkObj).length;
  // Chache
	const { data, isLoading: isDataLaoding, error } = useQuery({
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
  }, [location.pathname, isLoading, isDataLaoding]);

  const loadData = async () => {
    if (data && !isDataLaoding && error === null) {
      setProducts({ 
        ...products, 
        [dynamicKey]: data.data.data,
      });
      setIsLoading(false);
    } else if (error && !isDataLaoding) {
      setHasError(error);
    }
  }

  return (
    <>
      <h1>ProductsLayout { id }</h1>
    </>
  )
}

export default ProductsLayout