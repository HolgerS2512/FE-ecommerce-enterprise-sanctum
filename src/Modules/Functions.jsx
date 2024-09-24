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

export const extractUserSort = () => {
  const word = 'sort=';
  
  return (queryStr) => {
    const wordIndex = queryStr.indexOf(word);
    if (wordIndex === -1) {
      return null;
    }

    const startIndex = wordIndex + word.length;
    const endIndex = queryStr.indexOf('&');
    let restOfString = '';

    if (endIndex !== -1) {
      restOfString = queryStr.slice(startIndex, endIndex);
    } else {
      restOfString = queryStr.slice(startIndex);
    }

    return restOfString.trim();
  };
};

export const extractUserFilter = (filters) => {
  const result = {};

  return (queryStr) => {
    filters.forEach((filter) => {
      const search = filter + '=';
      const wordIndex = queryStr.indexOf(search);

      if (wordIndex === -1) {
        result[filter] = null;
      } else {
        let restOfString = '';
        const startIndex = wordIndex + search.length;
        restOfString = queryStr.slice(startIndex)
        const endIndex = restOfString.indexOf('&');
        
        if (endIndex !== -1) {
          restOfString = restOfString.slice(0, endIndex);
        }
        
        if (restOfString.includes('%2C')) {
          result[filter] = restOfString.split('%2C');
        } else {
          result[filter] = restOfString.trim() === 'true' || restOfString.trim();
        }
      }
    });

    return result;
  };
};

export const extractWordAfter = (word, delimiter = '=') => {
  return (str) => {
    const wordIndex = str.indexOf(word); // Position of the word in the string
    if (wordIndex === -1) {
      return null; // If the word is not there
    }

    // Start index of the desired substring (after the searched word)
    const startIndex = wordIndex + word.length;

    // Cut out the rest of the string after the searched word
    const restOfString = str.slice(startIndex);
    
    // Find index of delimiter
    const endIndex = restOfString.indexOf(delimiter);
    
    // If no delimiter is found, return the rest of the string
    if (endIndex === -1) {
      return restOfString.trim();
    }

    // Cut substring between the word and the delimiter
    return restOfString.replaceAll(delimiter, '').trim();
  };
};