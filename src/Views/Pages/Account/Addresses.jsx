import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

import Loading from "../../../components/Helpers/Loading";
import ZeroAddress from "../../../components/Account/ZeroAddress";
import WindowForm from "../../../components/WindowForm";
import AddAddress from "../../../components/Account/AddAddress";
import AddressLoader from "../../../components/Account/AddressLoader";
import RegularBtn from "../../../components/Helpers/RegularBtn";

const Addresses = () => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [addAddress, setAddAddress] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = (addAddress ? 'hidden' : 'auto');
  }, [addAddress]);

  const hasAddess = true; // Hat user schon eine addresse?

  const closeLoader = () => setIsLoading(false);

  // WindowForm events
  const openWindow = () => setAddAddress(true);
  const closeWindow = () => setAddAddress(false);

  return (
    <>
      {isLoading && <Loading />}

      <WindowForm open={addAddress} onClose={closeWindow} h1={t('add_address')}>
        <AddAddress open={addAddress} onClose={closeWindow} />
      </WindowForm>

      <div className="container-xl acc-dist">
        <div className="wrap35r">

          <h1 tabIndex={1} aria-description={t('saved_delivery_address')}>{t('saved_delivery_address')}</h1>

          {hasAddess ? <AddressLoader closeLoader={closeLoader} /> : <ZeroAddress />}

          <RegularBtn onClick={openWindow} position="end" ariaLabel={t('add_address')} text={t('add_address')} />

        </div>
      </div>
    </>
  )
}

export default Addresses
