import { useEffect, useState } from "react"
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";
import { useLayoutContext } from "../../Contexts/LayoutProvider";

import ROUTES from "../../Settings/ROUTES";
import axiosClient from "../../axios-clint";
import { extractUserFilter, extractUserSort } from "../../Modules/Functions";
import ProductMenu from "./ProductMenu";
import SelectSimilarArray from "../Util/SelectSimilarArray";

const STALETIME = 1000 * 60 * 5; // 5 Minutes
const CACHETIME = 1000 * 60 * 15; // 15 Minutes

const availableSort = [
  'topseller',
  'highest_reduction',
  'price_high',
  'price_low',
  'new',
];

const availableFilter = [
  'price',
  'color',
  'sale',
  'brand',
];

const ProductsLayout = ({ id }) => {
  // Common
  const { isLoading, setIsLoading, setHasError } = useOutletContext();
  const { products, setProducts } = useLayoutContext();
  const location = useLocation();
  // Kernel
  const dynamicKey = `category_${id}`;
  const checkObj = Object.keys(products[dynamicKey] ?? {});
  const hasData = Boolean(checkObj).length;
  // User Sort & Filter
  const extractAfterSort = extractUserSort();
  const extractAfterFilter = extractUserFilter(availableFilter);
  const [userSort, setUserSort] = useState(extractAfterSort(location.search));
  const [userFilter, setUserFilter] = useState(extractAfterFilter(location.search));
  // Stages
  const [firstExecution, setFirstExecution] = useState(true);
  // Chache
	const { data, isLoading: isDataLoading, error } = useQuery({
		queryKey: [dynamicKey],
		queryFn: () => axiosClient.get(`${ROUTES.request.CATEGORIES}/${id}${location.search !== '' ? location.search : ''}`),
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

  useEffect(() => {
    buildURL();
    if (firstExecution) {
      setFirstExecution(false);
    }
  }, [userSort, userFilter]);

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

  const buildURL = () => {
    const sort = userSort !== null && `sort=${userSort}`;
    const extractAfterSort = extractUserSort();
    const extractAfterFilter = extractUserFilter(availableFilter);
    const currSortUrlParam = extractAfterSort(location.search);
    const currFilterUrlParam = extractAfterFilter(location.search);

    if (sort || hasObjOneValue(currFilterUrlParam)) {
      const query = ['?'];

      if (currSortUrlParam !== userSort || currSortUrlParam !== null) {
        query.push(sort);
      }

      if (hasObjOneValue(currFilterUrlParam) || hasObjOneValue(userFilter)) {
        if (query.length > 1) query.push('&');

        if (firstExecution) {
          updateObjLeftJoin(userFilter, currFilterUrlParam);
        } else {
          updateObjLeftJoin(currFilterUrlParam, userFilter);
        }

        const filtered = getFilterUrl(userFilter);

        if (filtered) {
          query.push(getFilterUrl(userFilter));
        } else {
          query.pop();
        }
      }

      if (query.length > 1) pushInUrl(query);
    }
  }

  const hasObjOneValue = (obj) => {
    return Object.keys(obj).some((attr) => {
      return obj[attr] !== null;
    });
  }

  const updateObjLeftJoin = (leftObj, rightObj) => {
    Object.keys(leftObj).forEach((attr) => {
      if (leftObj[attr] !== rightObj[attr]) {
        leftObj[attr] = rightObj[attr];
      }
    });
  }

  const getFilterUrl = (obj) => {
    const result = [];

    Object.keys(obj).forEach((attr) => {
      const value = obj[attr];

      if (value !== null) {

        if (Array.isArray(value)) {

          if (value.length > 1) {
            let collect = '';
            value.forEach((el) => {
              collect += `%2C${el}`;
            });
            result.push(`${attr}=${collect.replace('%2C', '')}`);
          } else if (value.length > 0) {
            result.push(`${attr}=${value[0]}`);
          }

        } else {
          if (value) {
            result.push(`${attr}=${value}`);
          }
        }

      }
    });

    if (result.length > 1) {
      return result.flatMap((el, i) => {
        return (i === 0 ? el : ['&', el]);
      });
    } else {
      if (result.length > 0) {
        return result.join('');
      } else {
        return null;
      }
    }
  }

  const pushInUrl = (query) => {
    const q = query.flat().join('');
    window.history.pushState({}, '', location.pathname + q);
    location.search = q;
  }

  const changeFilter= (e) => {
    const name = e.target.dataset.filter;
    const value = e.target.dataset.value;
    setUserFilter((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h1>ProductsLayout { id }</h1>
      <div className="ms-5 ps-5">

        <SelectSimilarArray 
          options={availableSort} 
          selectedOption={userSort} 
          setSelectedOption={setUserSort} 
        />
        
      </div>

      <div className="pt-4">
        <button className="btn btn-dark" type="button" data-filter="price" data-value='4000-30000' onClick={changeFilter}>price</button>
        <button className="btn btn-dark" type="button" data-filter="color" data-value='blue' onClick={changeFilter}>color</button>
        <button className="btn btn-dark" type="button" data-filter="sale" data-value='true' onClick={changeFilter}>sale</button>
        <button className="btn btn-dark" type="button" data-filter="brand" data-value='nike' onClick={changeFilter}>brand</button>
      </div>

      <div className="pt-4">
        <button className="btn btn-dark" type="button" data-filter="price" data-value='' onClick={changeFilter}>price empty</button>
        <button className="btn btn-dark" type="button" data-filter="color" data-value='' onClick={changeFilter}>color empty</button>
        <button className="btn btn-dark" type="button" data-filter="sale" data-value='' onClick={changeFilter}>sale empty</button>
        <button className="btn btn-dark" type="button" data-filter="brand" data-value='' onClick={changeFilter}>brand empty</button>
      </div>

      <div className="m-3" tabIndex={1}>xfinity.test:3000/highlights-level-2-sub1-no-active?sort=new&sale=true&brand=nike%2Cadidas</div>

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