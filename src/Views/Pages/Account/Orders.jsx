import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../../../Contexts/NotificationProvider';
import ZeroOrders from '../../../components/Account/ZeroOrders';

const Orders = () => {
  // Common
  const { user } = useStateContext();
  const { isLoading, setIsLoading, setMiddlewareTimeout } = useOutletContext();
  const { setNotification } = useNotification();
  const {t} = useTranslation();
  // States
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      loadOrders();
      setIsLoading(false);
    }
    setVisible(!isLoading);
  }, [isLoading]);

  const loadOrders = () => {
    try {
      
    } catch (err) {
      if (err.response.status === 504) {
        setMiddlewareTimeout();
      } else {
        setNotification({
          visible: true,
          status: 'e',
          error: err,
        });
      }
    }
  }

  return (
    <div className='hidden' style={visible ? { visibility: 'visible' } : null}>
      
      <div className="container acc-dist">
        <div className="wrap70r">

          <h1 tabIndex={1} aria-description={t('orders')}>{t('orders')}</h1>
          <hr />

          <ZeroOrders />

        </div>
      </div>

    </div>
  )
}

export default Orders
