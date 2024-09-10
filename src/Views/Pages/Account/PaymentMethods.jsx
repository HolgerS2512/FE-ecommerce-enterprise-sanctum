import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useStateContext } from "../../../Contexts/ContextProvider";
import { find } from "../../../Modules/ObjectHelper";
import ROUTES from "../../../Settings/ROUTES";
import AesCryptographer from "../../../Modules/AesCryptographer";
import axiosClient from "../../../axios-clint";

import ZeroPaymentMeths from "../../../components/Account/ZeroPaymentMeths";
import WindowForm from "../../../components/WindowForm";
import StorePaymentMeths from "../../../components/Account/StorePaymentMeths";
import PaymentMethodsLoader from "../../../components/Account/PaymentMethodsLoader";
import RegularBtn from "../../../components/Helpers/RegularBtn";
import WindowChild from "../../../components/WindowChild";
import { useNotification } from "../../../Contexts/NotificationProvider";

const cryptographer = new AesCryptographer();

const PaymentMethods = () => {
  // Common
  const { user } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // DB fill
  const [paymentMeths, setPaymentMeths] = useState([]);
  const [editData, setEditData] = useState({});
  // States
  const [addPaymentMeths, setAddPaymentMeths] = useState(false);
  const [hasResponse, setHasResponse] = useState(false);
  const [visible, setVisible] = useState(false);
  // Special window
  const [windowInner, setWindowInner] = useState(false);
  const [wiQuest, setWiQuest] = useState(false);
  // Errorhandling
  const [httpStatus, setHttpStatus] = useState({ visible: false });

  useEffect(() => {
    if (isLoading) {
      loadPaymentMeths();
    }
    setVisible(!isLoading);
  }, [isLoading]);

  useEffect(() => {
    bodyOverflow();
  }, [addPaymentMeths]);

  const loadPaymentMeths = async () => {
    try {
      const res = await axiosClient.get(ROUTES.account.PAYMENTMETHODS);
      const { data, status } = res.data;

      if (status) {
        const decrypted = cryptographer.decrypt(data);
        setAddPaymentMeths(JSON.parse(decrypted));
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
    body.style.overflow = (addPaymentMeths ? 'hidden' : 'auto');
  }
  const openWindow = () => setPaymentMeths(true);

  const closeWindow = () => {
    setPaymentMeths(false);
    setHttpStatus({});
    setHasResponse(false);
    setIsLoading(true); 
  }

  // Edit events
  const handleDataEmpty = () => setEditData({});

  const handleEditClick = (e) => {
    const id = Number(e.target.dataset.id);
    setEditData(find(paymentMeths).byId(id));
    openWindow();
  }

  const regularBtn = (
    <RegularBtn 
      onClick={openWindow} 
      disabled={paymentMeths.length >= 8} 
      position="end" 
      ariaLabel={t('add_payment_methods')} 
      text={t('add_payment_methods')}
    />
  );

  const container = () => {
    return (
      <div className="container acc-dist">
        <div className="wrap35r">

          <h1 tabIndex={1} aria-description={t('saved_payment_methods')}>{t('saved_payment_methods')}</h1>

          { hasResponse &&
            (Boolean(paymentMeths.length) 
            ? <PaymentMethodsLoader 
                onClick={handleEditClick} 
                closeLoader={closeLoader} 
                user={user}
                paymentMeths={paymentMeths} 
                btn={regularBtn}
              /> 
            : <ZeroPaymentMeths closeLoader={closeLoader} btn={regularBtn} />)
          }

        </div>
      </div>
    )
  };

  const MemoizedContainer = React.memo(container);

  return (
    <div className='position-relative hidden' style={visible ? { visibility: 'visible' } : null}>
      <WindowForm 
        open={addPaymentMeths} 
        onClose={() => setAddPaymentMeths(false)} 
        h1={t('add_payment_methods')}
      >
        <StorePaymentMeths 
          data={editData} 
          user={user}
          hasResponse={hasResponse}
          setDataEmpty={handleDataEmpty} 
          open={addPaymentMeths} 
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
  )
}

export default PaymentMethods
