import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useStateContext } from '../../../Contexts/ContextProvider';
import { useTranslation } from 'react-i18next';

const Overview = () => {
  // Common
  const { user } = useStateContext();
  const { isLoading, setIsLoading } = useOutletContext();
  const {t} = useTranslation();
  // States
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isLoading) {
      loadOverview();
      setIsLoading(false);
    }
    setVisible(!isLoading);
  }, [isLoading]);

  const loadOverview = () => {
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
      
    </div>
  )
}

export default Overview
