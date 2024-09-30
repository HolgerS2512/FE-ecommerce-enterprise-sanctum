import React, { useEffect, useState, useCallback, lazy, useRef, useMemo  } from "react"
import { useQuery } from "react-query";
import { useLocation, useOutletContext } from "react-router-dom";
import { useLayoutContext } from "../../Contexts/LayoutProvider";

import { extractUserFilter, extractUserSort, getFilteredQuery, hasObjOneValue, updateObjLeftJoin, useWindowSize, compareTwoObjValues } from "../../Modules/Functions";
import ROUTES from "../../Settings/ROUTES";
import axiosClient from "../../axios-clint";
import SortBySelect from "../Products/SortBySelect";
import { useTranslation } from "react-i18next";
import { Filter } from "../icon/Icons";
import RegularBtn from "../Helpers/RegularBtn";
import RadioButton from "../Util/RadioButton";
import SwitchButton from "../Util/SwitchButton";
import DoubleRangeSlider from "../Util/DoubleRangeSlider";

const HalfScreenSlider = lazy(() => import("../Slider/HalfScreenSlider"));

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
  'sale',
  'size',
  'color',
  'brand',
];

const ProductsLayout = React.memo(({ id }) => {
  // Common
  const { isLoading, setIsLoading, setHasError } = useOutletContext();
  const { products, setProducts } = useLayoutContext();
  const { width, height } = useWindowSize();
  const location = useLocation();
  const {t} = useTranslation();
  // Kernel
  const dynamicKey = `category_${id}`;
  const checkObj = Object.keys(products[dynamicKey] ?? {});
  const hasData = Boolean(checkObj).length;
  // User Sort & Filter
  const extractAfterSort = extractUserSort();
  const extractAfterFilter = extractUserFilter(availableFilter);
  const [userSort, setUserSort] = useState(extractAfterSort(location.search));
  const [userFilter, setUserFilter] = useState(extractAfterFilter(location.search));
  // Refs
  const halfSideMenuRef = useRef(null);
  // States
  const [firstExecution, setFirstExecution] = useState(true);
  const [btnFilterIsOpen, setBtnFilterIsOpen] = useState(false);
  // HalfScreenSlider States
  const [hssShowDeleteApply, setHssShowDeleteApply] = useState(false);
  const [hssSortOpt, setHssSortOpt] = useState(userSort ?? 'topseller');
  const [hssFilters, setHssFilters] = useState(userFilter);
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
    setQueryURL();
    if (firstExecution) {
      setFirstExecution(false);
    }
  }, [userSort, userFilter]);

  /**
   * <HalfScreenSlider /> effects
   * 
  */
  useEffect(() => { // Close Filters 
    if (!btnFilterIsOpen) halfSideMenuRef.current.focus();
  }, [btnFilterIsOpen]);

  useEffect(() => { // Can delete or/and apply
    setHssShowDeleteApply( // need true
      hssSortOpt !== (userSort ?? 'topseller') 
      || (userSort ?? 'topseller') !== availableSort[0]
      || compareTwoObjValues(hssFilters, userFilter)
    ); 
    console.log(compareTwoObjValues(hssFilters, userFilter), hssFilters, userFilter)
  }, [hssSortOpt, userSort, hssFilters, userFilter]);

  /**
   * Load Data
   * 
  */
  const loadData = async () => {
    if (data && !isDataLoading && error === null) {
      setProducts(dynamicKey, data.data.data);
      setIsLoading(false);
    } else if (error && !isDataLoading) {
      setHasError(error);
    }
  }

  /**
   * Edit, handle & comapre URL values & user input  
   * 
  */
  const setQueryURL = () => {
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

        const filtered = getFilteredQuery(userFilter);

        if (filtered) {
          query.push(filtered);
        } else {
          query.pop();
        }
      }

      if (query.length > 1) pushQueryInUrl(query);
    }
  }

  // Set the url query values
  const pushQueryInUrl = useCallback((query) => {
    const q = query.flat().join('');
    window.history.pushState({}, '', location.pathname + q);
    location.search = q;
  }, []);

  /**
   * Handle change functions 
   * 
  */
  const HandleChangeFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const isCheckbox = e.target.type === 'checkbox';
    const v = isCheckbox ? e.target.checked : value;
    setHssFilters((prev) => ({ ...prev, [name]: v }));
    console.log('erfolg ', name, value)
  }

  const handleHalfSideMenu = () => setBtnFilterIsOpen((p) => !p);

  /**
   * Returned
  */
  return (
    <section className="" style={{ visibility: !(Object.keys(products[dynamicKey] ?? {}).length) ? 'hidden' : 'visible' }}>


      <header className="position-sticky top-0 bg-white d-flex align-items-center">
        <h1 className="m-0">ProductsLayout { id }</h1>

        <nav className="d-flex justify-content-end align-items-start bg-white" style={{ flexGrow: 1 }}>
          <button 
            className="btn-nostyle btn-filters bbs"
            onClick={handleHalfSideMenu}
            style={ width > 992 ? { marginRight: 15 + 'px' } : {}}
            tabIndex={1}
            ref={halfSideMenuRef}
          >
            <div className="fos-btn-inner">
              { width > 992 ? (btnFilterIsOpen ? t('hide_filters') : t('show_filters')) : t('filters') }
              <div style={{ margin: '-2px 0 0 .8rem' }} ><Filter size={20} /></div>
            </div>
          </button>

          {width > 992 && 
            <SortBySelect 
              options={availableSort} 
              selectedOption={userSort} 
              setSelectedOption={setUserSort} 
              classes='bbs'
            />
          }
        </nav>
      </header>

      <div className="m-3" tabIndex={1}>xfinity.test:3000/highlights-level-2-sub1-no-active?sort=new&sale=true&brand=nike%2Cadidas</div>

      {
        products[dynamicKey] && products[dynamicKey].map((product, i) => (
          <div key={i}>
            {/* {console.log(product)} */}
            <p className="ms-5">{product.article_number}</p>
          </div>
        ))
      }

      {/* Filters & Sort screen bigger 992 then only Filters */}
      <HalfScreenSlider 
        isOpen={btnFilterIsOpen} 
        onClose={() => setBtnFilterIsOpen(false)}
        closeAriaLabel='close_filters'
        sliderDescription={width > 992 ? t('filters_settings') : t('filters_sort_settings')}
        btnRef={halfSideMenuRef}
        cStyles={{ paddingBottom: '82px' }}
      >
        <form action="#" onSubmit={(e) => {
          e.preventDefault()
          console.log(e.target)
        }}>
          {/* Sort by */}
          {width < 992 &&
            <>
              <div id="radio-gcv1" className="pb-3">
                <h5 
                  className="fw-semibold mb-4" 
                  aria-label={`${t('products')} ${t('sorted_by')} ${t('section')}`}
                  tabIndex={1}
                >{t('sorted_by')}</h5>

                {/* Radio Group */}
                {/* At End {userSort} {setUserSort} */}
                <div style={{ marginLeft: .5 + 'rem' }}>
                  {availableSort.map((sort, i) => (
                    <div key={i} className="mb-3">
                      <RadioButton 
                        groupName='sort'
                        content={t(sort)}
                        value={sort}
                        checked={hssSortOpt === sort}
                        index={i}
                        onChange={(e) => setHssSortOpt(e.target.value)}
                      />
                    </div>
                  ))}
                </div>

              </div>
              <hr />
            </>
          }

          {/* -------------------------------- Filter By -------------------------------- */}

          <h5 
            className={`${width < 992 ? ' py-4 ' : 'pb-4'}fw-semibold mb-4`} 
            aria-label={`${t('products')} ${t('filter_by')} ${t('section')}`}
            tabIndex={1}
          >{t('filter_by')}</h5>
          
          {/* -------------------------------- Filter Price -------------------------------- */}

          <div style={{ marginLeft: .5 + 'rem' }}>
            <p className="fw-semibold mb-4" 
              aria-label={`${t('products')} ${t('filter_by')} ${t('price')}`}
            >{t('price')}</p>

            <DoubleRangeSlider 
              onChange={HandleChangeFilter} 
              vars={{ min: 0, max: 500 }}
              // vars={hssFilters.price} // edit userFilter over function if data set
              defaults={{ min: 0, max: 500}} 
            />
          </div>
          <hr />

          {/* -------------------------------- Filter Sale -------------------------------- */}

          <div id="switch-green" className='pb-3' style={{ marginLeft: .5 + 'rem' }}>
            <p className="fw-semibold mb-4">{t('sale')}</p>

            <SwitchButton
              name='sale'
              checked={hssFilters.sale}
              onChange={HandleChangeFilter}
              ariaLabel={`${t('products')} ${t('filter_by')} ${t('sale')}`}
            />
          </div>
          <hr />

          {/* -------------------------------- Filter Size -------------------------------- */}

          <div style={{ marginLeft: .5 + 'rem' }}>
            <p className="fw-semibold mb-4" 
              aria-label={`${t('products')} ${t('filter_by')} ${t('size')}`}
            >{t('size')}</p>
          </div>
          <hr />

          {/* -------------------------------- Filter Color -------------------------------- */}

          <div style={{ marginLeft: .5 + 'rem' }}>
            <p className="fw-semibold mb-4" 
              aria-label={`${t('products')} ${t('filter_by')} ${t('color')}`}
            >{t('color')}</p>
          </div>
          <hr />

          {/* -------------------------------- Filter Brand -------------------------------- */}

          <div style={{ marginLeft: .5 + 'rem' }}>
            <p className="fw-semibold mb-4" 
              aria-label={`${t('products')} ${t('filter_by')} ${t('brand')}`}
            >{t('brand')}</p>
          </div>


          {/* ------------------------------- Delete or Apply ------------------------------- */}
          <div className="flyb-group" style={{ bottom: (hssShowDeleteApply ? '0' : '-100px') }}>
            <RegularBtn 
              text={`${t('delete')} (${Number(userSort !== availableSort[0])})`}
              position='end w-100'
              color="light"
              onClick={(e) => {console.log(e.target)}}
            />
            <RegularBtn 
              text={t('apply')}
              position='start w-100'
              onClick={(e) => {console.log(e.target)}}
              type='submit'
            />
          </div>
        </form>
      </HalfScreenSlider>
    </section>
  )
})

export default ProductsLayout