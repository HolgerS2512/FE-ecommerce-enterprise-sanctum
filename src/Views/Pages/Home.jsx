import { useStateContext } from './../../Contexts/ContextProvider';

import SlideShow from '../../components/Slider/SlideShow';

const Home = () => {
  const {user, token} = useStateContext();

  return (
    <div>
      <h1>Home</h1>
      {/* <SlideShow /> */}
    </div>
  )
}

export default Home
