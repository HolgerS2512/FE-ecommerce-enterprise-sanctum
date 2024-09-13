import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ShortHeader from '../../common/ShortHeader';
import WebImage from '../../components/Helpers/WebImage';

const Maintenance = () => {
  const { t } = useTranslation();
  const [isAnimate, setIsAnimate] = useState(true);
  const [rotationAngles, setRotationAngles] = useState([0, 0, 0]);
  const gearRefs = [useRef(null), useRef(null), useRef(null)];

  // const handleClick = () => setAnimate((a) => !a);
  const handleClick = () => {
    if (isAnimate) {
      // Pause the rotation and capture the current angle for each object
      const newAngles = gearRefs.map((gearRef, i) => {
        const computedStyle = window.getComputedStyle(gearRef.current);
        const matrix = computedStyle.transform;

        if (matrix !== 'none') {
          const values = matrix.split('(')[1].split(')')[0].split(',');
          const a = parseFloat(values[0]);
          const b = parseFloat(values[1]);
          return Math.round(Math.atan2(b, a) * (180 / Math.PI));
        } else {
          return 0;
        }
      });
      setRotationAngles(newAngles);
      setIsAnimate(false);
    } else {
      setIsAnimate(true);
    }
  };

  return (
    <div style={styles.container}>
      <ShortHeader />
      <div style={styles.row}>
        <div style={styles.inner}>

          <div onClick={handleClick} className='user-select-none position-relative' style={styles.gearContainer}>
            <div
              ref={gearRefs[0]}
              className='position-absolute rotate-slow-small'
              style={{
                ...styles.gear,
                ...styles.gearLeft,
                transform: `rotate(${rotationAngles[0]}deg)`,
                animationPlayState: isAnimate ? 'running' : 'paused',
              }}
            >
              <WebImage 
                src='public/images/gear2.webp'
                fallbackSrc='public/images/gear2.png'
                width={52}
                height={52}
                className='drop-shadow-gear'
              />
            </div>

            <div
              ref={gearRefs[1]}
              className='rotate-slow'
              style={{
                ...styles.gear,
                transform: `rotate(${rotationAngles[1]}deg)`,
                animationPlayState: isAnimate ? 'running' : 'paused',
              }}
            >
              <WebImage 
                src='public/images/gear.webp'
                fallbackSrc='public/images/gear.png'
                width={120}
                height={120}
                className='drop-shadow-gear'
              />
            </div>

            <div className='position-absolute' style={{
              ...styles.gearRight,
              ...styles.gear,
              }}
            >
              <div
                ref={gearRefs[2]}
                className='position-absolute rotate-slow-negativ'
                style={{
                  ...styles.gearSpec,
                  transform: `rotate(${rotationAngles[2]}deg)`,
                  animationPlayState: isAnimate ? 'running' : 'paused',
                }}
              >
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
    cursor: 'pointer',
  },
  gear: {
    maxWidth: 'max-content',
  },
  gearLeft: {
    left: '50%',
    top: '-70px',
  },
  gearRight: {
    top: '-72px',
  },
  gearSpec: {
    left: '-5rem',
  },
};

export default Maintenance
