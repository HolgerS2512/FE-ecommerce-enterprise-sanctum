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

// Check has attribute min one value or only null
export const hasObjOneValue = (obj) => {
  return Object.keys(obj).some((attr) => {
    return obj[attr] !== null;
  });
}

// Compare 2 objects and join the left obj values to right obj
export const updateObjLeftJoin = (leftObj, rightObj) => {
  Object.keys(leftObj).forEach((attr) => {
    if (leftObj[attr] !== rightObj[attr]) {
      leftObj[attr] = rightObj[attr];
    }
  });
}

// Return an array with filtered values from user input obj
export const getFilteredQuery = (obj) => {
  const result = [];

  Object.keys(obj).forEach((attr) => {
    const value = obj[attr];

    if (value !== null) {

      if (Array.isArray(value)) {

        if (value.length > 1) {
          let collect = '';
          value.forEach((el) => {
            collect += `%2C${el}`;
          });
          result.push(`${attr}=${collect.replace('%2C', '')}`);
        } else if (value.length > 0) {
          result.push(`${attr}=${value[0]}`);
        }

      } else {
        if (value) {
          result.push(`${attr}=${value}`);
        }
      }

    }
  });

  if (result.length > 1) {
    return result.flatMap((el, i) => {
      return (i === 0 ? el : ['&', el]);
    });
  } else {
    if (result.length > 0) {
      return result.join('');
    } else {
      return null;
    }
  }
}

// Returned false then all values even
// Returned true if one values not even 
export const compareTwoObjValues = (obj, cObj) => {
  const result = [];
  
  Object.keys(obj).forEach((attr) => {
    if (obj[attr] === null && cObj[attr] === null) {
      result.push(false); // Both values are null, so they are "equal"
    } 
    else if (obj[attr] === null || cObj[attr] === null) {
      const nonNullValue = obj[attr] ?? cObj[attr]; // Get the non-null value
      if (typeof nonNullValue === 'boolean') {
        result.push(nonNullValue); // If it's a boolean, return the boolean
      } else if (typeof nonNullValue === 'string' && nonNullValue.length > 0) {
        result.push(true); // If it's a non-empty string, return true
      } else {
        result.push(false); // In all other cases, return false
      }
    } 
    else {
      result.push(obj[attr] !== cObj[attr]);
    }
  });

  return result.some((b) => b === true);
};

// Count difference between 2 objects
export const countDiffTwoObjValues = (obj, cObj) => {
  const collect = [];
  
  Object.keys(obj).forEach((attr) => {
    if (obj[attr] === null && cObj[attr] === null) {
      // Both values are null, so they are "equal"
    } 
    else if (obj[attr] === null || cObj[attr] === null) {
      const nonNullValue = obj[attr] ?? cObj[attr]; // Get the non-null value

      if (typeof nonNullValue === 'boolean') {
        collect.push(nonNullValue); // If it's a boolean, return the boolean
      } else if (typeof nonNullValue === 'string' && nonNullValue.length > 0) {
        collect.push(true); // If it's a non-empty string, return true
      } else {
        // In all other cases, return not
      }
    } 
    else {
      collect.push(obj[attr] !== cObj[attr]);
    }
  });

  const filtered = collect.filter((b) => b === true);

  return filtered.length;
};

// Edit data inputs - delete last entry if not number 
export const valInputByNumber = (value) => {
  if (isNaN(value)) {
    return Number(value.slice(0, -1));
  }
  return Number(value);
}

