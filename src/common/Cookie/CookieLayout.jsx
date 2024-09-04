import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useCookieContext } from "../../Contexts/CookieProvider";

import JumpLink from '../../components/Helpers/JumpLink';
import CookieCategory from "./CookieCategory";
import { ArrowRight } from "../../components/icon/Icons";
import Cookies from "../../Settings/Cookies";

const CookieLayout = () => {
  // Common
  const { ccSettings, setCcSettings } = useCookieContext();
  const {t} = useTranslation();
  // Common state
  const [cookies, setCookies] = useState(ccSettings);
  // Refs
  const targetRef = useRef();
  const buttonRef = useRef(null);
  // States
  const viewBP = {
    agreement: true,
    details: false,
    about: false
  };
  const [view, setView] = useState(viewBP);
  
  useEffect(() => {
    targetRef.current.focus();
  }, []);

  const handleChange = (e) => {
    handleView(e);
    handleAnimateHeader(e);
  }

  const handleAllowAll = (e) => {
    const nullable = showNullableCategory();
    const cc = {}

    Object.entries(cookies).forEach((c) => {
      cc[c[0]] = nullable[c[0]];
    });
    setCcSettings(cc);
  }

  const handleAllowSelection = (e) => {
    if (view.details) {
      setCcSettings(cookies);
    } else {
      buttonRef.current.click();
    }
  }

  const handleReject = () => {
    const cc = {}
    Object.entries(cookies).forEach((c) => {
      cc[c[0]] = false;
    });
    setCcSettings(cc);
  }

  const showNullableCategory = () => {
    const result = {};
    Object.values(Cookies).forEach((cc) => {
      result[cc.name] = Boolean(cc.data.length);
    });
    return result;
  }

  const handleView = (e) => {
    const { view: currView } = e.currentTarget.dataset;
    Object.keys(view).map((key) => view[key] = false);
    setView({ ...view, [currView]: true });
  }

  const handleAnimateHeader = (e) => {
    const el = e.currentTarget;
    const parentEl = el.parentElement;
    const item = document.querySelectorAll('.cc-btn');
    const someBtns = Array.from(parentEl.querySelectorAll('button')).length
    // Set btn header active class
    item.forEach((btn) => btn.classList.remove('active'));
    if (el.classList.contains('cc-btn')) {
      el.classList.add('active');
    }
    // Header line movement
    for (let i = 1; i <= someBtns; i++) {
      if (parentEl.classList.contains(`cc-h-a${i}`)) {
        parentEl.classList.remove(`cc-h-a${i}`);
      }
    }
    parentEl.classList.add(`cc-h-a${el.dataset.animate}`);
  }

  const agreementContent = (
    <div tabIndex={1} aria-labelledby="cc-at" aria-describedby='cc-ad'>
      <span id="cc-at" className="fw-semibold d-block mb-2">{t('cookie.agree_title')}</span>
      <span id="cc-ad">{t('cookie.agree_txt')}</span>
    </div>
  );

  const aboutContent = (
    <div id="cc-desc-about" tabIndex={1} aria-describedby='cc-desc-about'>
      <span className="d-block mb-3">{t('cookie.about.row1')}</span>
      <span className="d-block mb-3">{t('cookie.about.row2')}</span>
      <span className="d-block mb-3">{t('cookie.about.row3')}</span>
      <span className="d-block mb-3">{t('cookie.about.row4')}</span>
      <span className="d-block mb-3">{t('cookie.about.row5')}</span>
      <span className="d-block mb-3">{t('cookie.about.row6')}</span>
    </div>
  );

  const viewStyle = () => {
    if (view.agreement) return 'agreement';
    if (view.details) return 'details';
    if (view.about) return 'about';
  } 

  // Important!!! 
  // add in config => sro_ + all_allow: "Direkt zur Cookie Bestätigung springen",

  return (
    <div id="cookie-window" role="banner" aria-labelledby="cc-at" aria-describedby='cc-ad' ref={targetRef}>
      <div className="cc-wrapper">
        <JumpLink role='navigation' link='all_allow' />

        {/* Headline */}
        <div className="cc-header">
          <div className="d-flex cc-h-ab">
            <button 
              onClick={handleChange} 
              type="button" 
              className="btn-nostyle cc-btn ps-2 active"
              aria-label={t('cookie.agreement')}
              tabIndex={1}
              role="button"
              data-view='agreement'
              data-animate='1'
            >{t('cookie.agreement')}</button>
            <button 
              onClick={handleChange} 
              ref={buttonRef}
              type="button" 
              className="btn-nostyle cc-btn"
              aria-label={t('cookie.details')}
              tabIndex={1}
              role="button"
              data-view='details'
              data-animate='2'
            >{t('cookie.details')}</button>
            <button 
              onClick={handleChange} 
              type="button" 
              className="btn-nostyle cc-btn pe-2"
              aria-label={t('cookie.about_cookies')}
              tabIndex={1}
              role="button"
              data-view='about'
              data-animate='3'
            >{t('cookie.about_cookies')}</button>
          </div>
        </div>

        {/* Body */}
        <div className="cc-body">
          <div className={`cc-overflow ${viewStyle()}`}>
            <ul className="ccb-inner">
              {view.agreement && agreementContent}
              {view.details && <CookieCategory cookies={cookies} setCookies={setCookies} />}
              {view.about && aboutContent}
            </ul> 
          </div>
        </div>

        {/* Footer */}
        <div className="cc-footer">
          {/* Buttons */}
          <div className="row flex-row-reverse mx-2 pt-2">
            <div className="col-sm-4 px-0 mb-2">
              <button 
                id="all_allow"
                type="button" 
                onClick={handleAllowAll} 
                className="btn btn-dark w-100"
                aria-label={t('cookie.allow_all')}
                tabIndex={1}
                role="button"
              >{t('cookie.allow_all')}</button>
            </div>
            <div className="col-sm-4 px-0 px-sm-2 mb-2">
              <button 
                type="button" 
                onClick={handleAllowSelection} 
                className="btn btn-secondary w-100"
                aria-label={view.details ? t('cookie.allow_selection') : t('cookie.adjust')}
                tabIndex={1}
                role="button"
              >
                <div className="btn-i">
                  {view.details ? t('cookie.allow_selection') : t('cookie.adjust')}
                  {!view.details && <span className="i">
                    {<ArrowRight size={18} />}
                  </span>}
                </div>
              </button>
            </div>
            <div className="col-sm-4 px-0 mb-2">
              <button 
                type="button" 
                onClick={handleReject} 
                className="btn btn-secondary w-100"
                aria-label={t('cookie.reject')}
                tabIndex={1}
                role="button"
              >{t('cookie.reject')}</button>
            </div>
          </div>

          {/* Powered by */}
          <div className="mx-2 text-center">
            <a tabIndex={1} role="link" href="http://www.xfinity-software.de" target="_blank" rel='noopener noreferrer' aria-label="Powered by xFinity Software" className="text-body-tertiary powered">Powered by&nbsp;
              <span className="company">xFinity&nbsp;Software</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CookieLayout
