import React, { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";

import ROUTES from "../../Settings/ROUTES";
import axiosClient from "../../axios-clint";
import { useLayoutContext } from "../../Contexts/LayoutProvider";

const STALETIME = 1000 * 60 * 60 * 12; // 12 Hours
const CACHETIME = 1000 * 60 * 60 * 24; // 24 Hours

const CategoryLayout = React.memo(({ category }) => {
  // Common
  const { isLoading, setIsLoading, setHasError } = useOutletContext();
  const { products } = useLayoutContext();
  const location = useLocation();
  const { id } = category;
  // Kernel
  // const [products, setProducts] = useState({});
  // const dynamicKey = `category_${id}`;
  // const checkObj = Object.keys(products[dynamicKey] ?? {});
  // const hasData = Boolean(checkObj).length;
  // Chache
	// const { data, isLoading: isDataLaoding, error } = useQuery({
	// 	queryKey: [dynamicKey],
	// 	queryFn: () => axiosClient.get(`${ROUTES.request.CATEGORIES}/${id}`),
	// 	staleTime: STALETIME,
	// 	cacheTime: CACHETIME,
	// 	enabled: !hasData, // Execute only if condition is met
	// });

  // useEffect(() => {
  //   const pLength = Object.keys(products[dynamicKey] ?? {}).length;
  //   if (Boolean(pLength)) {
  //     setIsLoading(false);
  //   } else {
  //     loadData();
  //   }
  // }, [location.pathname, isLoading, isDataLaoding]);

  // const loadData = async () => {
  //   if (data && !isDataLaoding && error === null) {
  //     setProducts({ 
  //       ...products, 
  //       [dynamicKey]: data.data.data,
  //     });
  //     setIsLoading(false);
  //   } else if (error && !isDataLaoding) {
  //     setHasError(error);
  //   }
  // }

  useEffect(() => {
    if (Object.keys(products).length) {
    // && products[id <- last category.id]) {
      isLoading && setIsLoading(false);
    }
  }, [products, location.pathname, isLoading]);

  console.log(category)

  return (
    <>
      <h1>CategoryLayout {category.id}</h1>
    </>
  )
})

export default CategoryLayout
