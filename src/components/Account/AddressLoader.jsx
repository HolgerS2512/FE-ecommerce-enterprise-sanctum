import { useEffect } from "react"
import { useTranslation } from "react-i18next";
import { find } from "../../Modules/ObjectHelper";

const AddressLoader = ({ closeLoader, onClick, user, addresses }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const hasUser = Boolean(Object.keys(user).length);
    const hasAddresses = Boolean(addresses.length);
    if (hasUser && hasAddresses) {
      setTimeout(() => closeLoader(), 70);
    }
  }, [user, addresses]);

  const renderHTML = (obj) => {
    if (!obj) return;

    const hasName = obj.firstname && obj.lastname;
    const name = `${(hasName ? obj : user).firstname} ${(hasName ? obj : user).lastname}`;

    return (
      <div className="d-flex justify-content-between px-1">
        <div className="text-secondary">
          <div>{name}</div>
          <div>{obj.street}</div>
          <div>{obj.zip}</div>
          <div>{obj.city}</div>
        </div>

        <button 
          tabIndex={1}
          data-id={obj.id}
          aria-label={`${t('input.address')} ${t('edit')}: ${name} ${obj.street} ${obj.zip} ${obj.city}`}
          className="btn-nostyle btn-sm-link"
          onClick={onClick}
        >
          {t('edit')}
        </button>
      </div>
    );
  }

  const active = renderHTML(find(addresses).byActiveFirst());

  return (
    <div className="mb-5 mt-225r p fw-semibold">

      {active !== undefined && <div className="mb-1">{t('standard_delivery_address') + ':'}</div>}

      {active}

      {find(addresses).byNoneActive().map((addr, i) => (
        <div key={i}>
          {!(i === 0 && active === undefined) && <hr/>}
          {renderHTML(addr)}
        </div>
      ))}

    </div>
  )
}

export default AddressLoader
