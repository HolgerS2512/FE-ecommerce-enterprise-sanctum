import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider';
import { useTranslation } from 'react-i18next';

const PaymentMethods = () => {
  // Common
  const { user } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const {t} = useTranslation();
  // States
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // loadAddress();
      setIsLoading(false);
    }
    setVisible(!isLoading);
  }, [isLoading]);

  return (
    <div className='hidden' style={visible ? { visibility: 'visible' } : null}>
      
    </div>
  )
}

export default PaymentMethods
