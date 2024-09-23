import { useEffect, useState } from 'react'

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // 1. Function update window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 2. Add Eventlistener
    window.addEventListener('resize', handleResize);

    // 3. Cleanup-Function (remove Eventlistener)
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array for one load

  return windowSize;
}