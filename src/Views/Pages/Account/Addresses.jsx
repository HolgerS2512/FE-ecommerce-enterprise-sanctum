import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useStateContext } from "../../../Contexts/ContextProvider";
import { find } from "../../../Modules/ObjectHelper";
import ROUTES from "../../../Settings/ROUTES";
import AesCryptographer from "../../../Modules/AesCryptographer";
import axiosClient from "../../../axios-clint";

import ZeroAddress from "../../../components/Account/ZeroAddress";
import WindowForm from "../../../components/WindowForm";
import StoreAddress from "../../../components/Account/StoreAddress";
import AddressLoader from "../../../components/Account/AddressLoader";
import RegularBtn from "../../../components/Helpers/RegularBtn";
import WindowChild from "../../../components/WindowChild";
import { useNotification } from "../../../Contexts/NotificationProvider";

const cryptographer = new AesCryptographer();

const Addresses = () => {
  // Common
  const { user } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // DB fill
  const [addresses, setAddresses] = useState([]);
  const [editData, setEditData] = useState({});
  // States
  const [addAddress, setAddAddress] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [visible, setVisible] = useState(false);
  // Special window
  const [windowInner, setWindowInner] = useState(false);
  const [wiQuest, setWiQuest] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    if (isLoading) {
      loadAddress();
    }
    setVisible(!isLoading);
  }, [isLoading]);

  useEffect(() => {
    bodyOverflow();
  }, [addAddress]);

	const loadAddress = async () => {
    try {
      const res = await axiosClient.get(ROUTES.account.ADDRESSES);
      const { data, status } = res.data;

      if (status) {
        const decrypted = cryptographer.decrypt(data);
        setAddresses(JSON.parse(decrypted));
      } 
    } catch (err) {
      const { message } = err.response.data;
      setNotification({
        visible: true,
        status: 'e',
        msg: message,
      });
    }
    setHasResponse(true);
	}

  const closeLoader = () => setIsLoading(false);

  // WindowForm events
  const bodyOverflow = () => {
    const body = document.querySelector('body');
    body.style.overflow = (addAddress ? 'hidden' : 'auto');
  }
  const openWindow = () => setAddAddress(true);

  const closeWindow = () => {
    setAddAddress(false);
    setHttpStatus({});
    setHasResponse(false);
    setIsLoading(true); 
  }

  // Edit events
  const handleDataEmpty = () => setEditData({});

  const handleEditClick = (e) => {
    const id = Number(e.target.dataset.id);
    setEditData(find(addresses).byId(id));
    openWindow();
  }

  const regularBtn = (
    <RegularBtn 
      onClick={openWindow} 
      disabled={addresses.length >= 8} 
      position="end" 
      ariaLabel={t('add_address')} 
      text={t('add_address')}
    />
  );

  const container = () => {
    return (
      <div className="container acc-dist">
        <div className="wrap35r">

          <h1 tabIndex={1} aria-description={t('saved_delivery_address')}>{t('saved_delivery_address')}</h1>

          { hasResponse &&
            (Boolean(addresses.length) 
            ? <AddressLoader 
                onClick={handleEditClick} 
                closeLoader={closeLoader} 
                user={user}
                addresses={addresses} 
                btn={regularBtn}
              /> 
            : <ZeroAddress closeLoader={closeLoader} btn={regularBtn} />)
          }

        </div>
      </div>
    )
  };

  const MemoizedContainer = React.memo(container);

  return (
    <div className='position-relative hidden' style={visible ? { visibility: 'visible' } : null}>
      <WindowForm 
        open={addAddress} 
        onClose={() => setAddAddress(false)} 
        h1={t('add_address')}
      >
        <StoreAddress 
          data={editData} 
          user={user}
          hasResponse={hasResponse}
          setDataEmpty={handleDataEmpty} 
          open={addAddress} 
          onClose={closeWindow} 
          httpStatus={httpStatus}
          setHttpStatus={setHttpStatus}
          setWindowInner={setWindowInner}
          windowInnerQuest={wiQuest}
          setWindowInnerQuest={setWiQuest}
        />
        {windowInner && <WindowChild 
          setWindowInner={setWindowInner}
          setQuest={setWiQuest}
        />}
      </WindowForm>

      <MemoizedContainer />

    </div>
  );
}

export default Addresses
