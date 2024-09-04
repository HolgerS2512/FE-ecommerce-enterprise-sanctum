import { useTranslation } from "react-i18next";
import { ArrowDown, LinkIcon } from "../../components/icon/Icons";
import CookieRenderer from "./CookieRenderer";

const CookieProviderObj = ({ data }) => {
  const { provider, policy, cookies } = data;
  const {t} = useTranslation();

  const convertNameToId = (name) => {
    return name.toLowerCase().replaceAll(' ', '-');
  }

  return (
    <>
      <div>
        <button 
          className="acc-cc-btn btn-nostyle px-0 justify-content-between w-100" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target={`#${convertNameToId(provider)}`} 
          aria-expanded="false" 
          aria-controls={`${convertNameToId(provider)}`}
          tabIndex={1}
        >
          <div className="txt text-start d-flex align-items-center ps-2">
            {provider}
            <span id="cc-number">{cookies.length}</span>
          </div>
          
          <i id="cc-icon"><ArrowDown /></i>
        </button>

        <a 
          className="me-2 ps-2" 
          href={policy} 
          aria-label={t('cookie.providers_pp')}
          rel="noopener noreferrer"
          tabIndex={1}
        >{t('cookie.providers_pp')}</a>
        <LinkIcon size={18} />
      </div>

      <div className="collapse" id={`${convertNameToId(provider)}`}>
        <hr />
        <div className="card card-body">
          
          {Object.values(cookies).map((cc, i) => (
            <ul key={i} className="cc-rcv" tabIndex={1} aria-labelledby="cc-description" id="cc-description">
              <CookieRenderer data={cc} />
            </ul>
          ))}

        </div>
      </div>
    </>
  )
}

export default CookieProviderObj
