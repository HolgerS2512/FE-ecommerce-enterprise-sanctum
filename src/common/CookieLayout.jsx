import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
import { ArrowRight } from "../components/icon/Icons";

const CookieLayout = () => {
  // Common
  const {t} = useTranslation();
  // States
  const viewBP = {
    agreement: true,
    details: false,
    about: false
  };
  const [view, setView] = useState(viewBP);

  useEffect(() => {
    console.log(view)
  }, [view]);

  const handleChange = (e) => {
    const el = e.currentTarget;
    const item = document.querySelectorAll('.cc-btn');
    item.forEach((btn) => btn.classList.remove('active'));
    if (el.classList.contains('cc-btn')) {
      el.classList.add('active');
    }
    handleView(e);
  }

  const handleSubmit = (e) => {
    console.log(e.target.innerHTML)
  }

  const handleReject = (e) => {
    console.log(e.target.innerHTML)
  }

  const handleView = (e) => {
    const { view: currView } = e.currentTarget.dataset;
    Object.keys(view).map((key) => view[key] = false);
    setView({ ...view, [currView]: true });
  }

  const agreementContent = (
    <>
      <span className="fw-semibold d-block mb-2">{t('cookie.agree_title')}</span>
      <span>{t('cookie.agree_txt')}</span>
    </>
  );

  const aboutContent = (
    <>
      <span className="d-block mb-3">{t('cookie.about.row1')}</span>
      <span className="d-block mb-3">{t('cookie.about.row2')}</span>
      <span className="d-block mb-3">{t('cookie.about.row3')}</span>
      <span className="d-block mb-3">{t('cookie.about.row4')}</span>
      <span className="d-block mb-3">{t('cookie.about.row5')}</span>
      <span className="d-block mb-3">{t('cookie.about.row6')}</span>
    </>
  );

  const viewStyle = () => {
    if (view.agreement) return { maxHeight: '100%' };
    if (view.details) return { maxHeight: '100%' };
    if (view.about) return { maxHeight: '100%' };
  }

  const viewStyleWrapper = () => {
    if (view.agreement) return { maxHeight: '18rem' };
    // if (view.details) return { maxHeight: '25rem' };
    if (view.about) return { maxHeight: '22rem' };
  }

  return (
    <div id="cookie-window">
      <div className="cc-wrapper">

        {/* Headline */}
        <div className="cc-header">
          <div className="d-flex">
            <button 
              onClick={handleChange} 
              type="button" 
              className="btn-nostyle cc-btn ps-2 active"
              aria-label={t('cookie.agreement')}
              tabIndex={1}
              data-view='agreement'
            >{t('cookie.agreement')}</button>
            <button 
              onClick={handleChange} 
              type="button" 
              className="btn-nostyle cc-btn"
              aria-label={t('cookie.details')}
              tabIndex={1}
              data-view='details'
            >{t('cookie.details')}</button>
            <button 
              onClick={handleChange} 
              type="button" 
              className="btn-nostyle cc-btn pe-2"
              aria-label={t('cookie.about_cookies')}
              tabIndex={1}
              data-view='about'
            >{t('cookie.about_cookies')}</button>
          </div>
        </div>

        {/* Body */}
        <div className="cc-body">
          <div className="cc-overflow" style={viewStyleWrapper()}>
            <div className="ccb-inner">
              {view.agreement && agreementContent}
              {view.details && 'hallo'}
              {view.about && aboutContent}
            </div> 
          </div>
        </div>

        {/* Buttons */}
        <div className="row flex-row-reverse mx-2 pt-2">
          <div className="col-sm-4 px-0 mb-2">
            <button 
              type="button" 
              onClick={handleSubmit} 
              className="btn btn-dark w-100"
              aria-label={t('cookie.allow_all')}
              tabIndex={1}
            >{t('cookie.allow_all')}</button>
          </div>
          <div className="col-sm-4 px-0 px-sm-2 mb-2">
            <button 
              type="button" 
              onClick={handleChange} 
              className="btn btn-secondary w-100"
              aria-label={t('cookie.adjust')}
              tabIndex={1}
              data-view='details'
            >
              <div className="btn-i">
                {t('cookie.adjust')}
                <span className="i">
                  {<ArrowRight size={18} />}
                </span>
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
            >{t('cookie.reject')}</button>
          </div>
        </div>

        {/* Powered by */}
        <div className="mx-2 text-center">
          <a tabIndex={1} href="http://www.xfinity-software.de" target="_blank" rel='noopener noreferrer' aria-label="Powered by xFinity Software" className="text-body-tertiary powered">Powered by&nbsp;
            <span className="company">xFinity&nbsp;Software</span>
          </a>
        </div>

      </div>
    </div>
  )
}

export default CookieLayout
