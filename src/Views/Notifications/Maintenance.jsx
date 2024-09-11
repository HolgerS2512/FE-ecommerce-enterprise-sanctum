import React from 'react'
import { useTranslation } from 'react-i18next'
import ShortHeader from '../../common/ShortHeader';
import { Gear } from '../../components/icon/Icons';
import WebImage from '../../components/Helpers/WebImage';

const Maintenance = () => {
  const { t } = useTranslation();

  return (
    <div style={styles.container}>
      <ShortHeader />
      <div style={styles.row}>
        <div style={styles.inner}>

          <div className='user-select-none pe-none position-relative' style={styles.gearContainer}>
            <div className='rotate-slow-small position-absolute' style={styles.gearLeft}>
                <WebImage 
                  src='public/images/gear2.webp'
                  fallbackSrc='public/images/gear2.png'
                  width={52}
                  height={52}
                  className='drop-shadow-gear'
                />
            </div>

            <div className='rotate-slow' style={styles.gear}>
              <WebImage 
                src='public/images/gear.webp'
                fallbackSrc='public/images/gear.png'
                width={120}
                height={120}
                className='drop-shadow-gear'
              />
            </div>

            <div className='position-absolute' style={styles.gearRight}>
              <div className='rotate-slow-negativ position-absolute' style={styles.gearSpec}>
                <WebImage 
                  src='public/images/gear3.webp'
                  fallbackSrc='public/images/gear3.png'
                  width={80}
                  height={80}
                  className='drop-shadow-gear'
                />
              </div>
            </div>
          </div>

          <h1 className='mt-3' tabIndex={1} aria-label={t('maintenance.title')}>{t('maintenance.title')}</h1>
          <p className='h6 mb-2' tabIndex={1} aria-label={t('maintenance.message')}>{t('maintenance.message')}</p>
          <p className='h5' tabIndex={1} aria-label={t('maintenance.message2')}>{t('maintenance.message2')}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundColor: '#fdffff',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100% - 140px)',
    textAlign: 'center',
    margin: '0 36px',
  },
  inner: {
    maxWidth: '460px',
    paddingTop: '100px'
  },
  gearContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 0 0 2rem',
  },
  gear: {
    maxWidth: 'max-content',
  },
  gearLeft: {
    maxWidth: 'max-content',
    left: '50%',
    top: '-70px',
  },
  gearRight: {
    maxWidth: 'max-content',
    top: '-72px',
  },
  gearSpec: {
    left: '-5rem',
  },
};

export default Maintenance
