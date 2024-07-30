import ImageAltMaker from './../Modules/ImageAltMaker.jsx';
import Logo from '../components/icon/Logo.jsx'
import COMPANY from '../Settings/COMPANY.js';

const ShortHeader = () => {
  const alt = ImageAltMaker([ 'logo' ], 'png');

  return (
    <header className='short-header'>
      <div className='sh-h-inner'>
        <div>
          <img src={Logo} alt={alt} />
          <h1>{COMPANY.name}</h1>
        </div>
      </div>
    </header>
  )
}

export default ShortHeader
