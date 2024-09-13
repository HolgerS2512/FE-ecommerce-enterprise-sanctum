import { Regex, Rules } from "../Settings/ValidationConf";

// Define alwasy regex for this object
// Define Rules for min or max chars
// Errors for regex return `error.THISNAME`


// Validation
const ValidationManager = (obj) => {
  const reObj = {};
  
  Object.entries(obj).forEach((row) => {
    const name = row[0];
    const value = row[1];

    switch (name) {
      case 'firstname':
      case 'lastname':
      case 'email':
      case 'pin':
      case 'street':
        // regex
        if (!(Regex[name]).test(value)) {
          reObj[name] = [];
          reObj[name].push(`error.${name}`);
        }
        // length (override regex) (min, max)
        if ((Rules[name].min) > value.length) {
          reObj[name] = [];
          reObj[name].push(`${Rules.required}`);
        }
        if ((Rules[name].max) < value.length) {
          reObj[name] = [];
          reObj[name].push('error.max', Rules[name].max);
        }
        break;

      case 'day':
      case 'month':
      case 'year':
      case 'salutation':
      case 'phone':
      case 'details':
      case 'zip':
      case 'city':
      case 'country':
      case 'state':
        // regex
        if (!(Regex[name]).test(value)) {
          reObj[name] = [];
          reObj[name].push(`error.${name}`);
        }
        break;

      case 'message':
        // length (override regex) (min, max)
        if ((Rules[name].min) > value.length) {
          reObj[name] = [];
          reObj[name].push(`${Rules.required}`);
        }
        if ((Rules[name].max) < value.length) {
          reObj[name] = [];
          reObj[name].push('error.max', Rules[name].max);
        }
        break;

      case 'password':
        if (!(Regex[name]).test(value) 
            || (Rules[name].min) > value.length 
            || (Rules[name].max) < value.length
        ) {
          reObj[name] = [];
        }
        // regex
        if (!(Regex[name]).test(value)) {
          reObj[name].push('error.password');
        }
        // length (min, max)
        if ((Rules[name].min) > value.length) {
          reObj[name] = [];
          reObj[name].push(`${Rules.required}`);
        }
        if ((Rules[name].max) < value.length) {
          reObj[name] = [];
          reObj[name].push('error.max', Rules[name].max);
        }
        break;

    
      default: break;
    }
  });
  return reObj;
}

export const createValidator = (clientError) => {
  return {
    val: (name, value) => {
      const check = { ...ValidationManager({ [name]: value }) };
      const checked = Boolean(Object.keys(check).length);
      
      clientError[name].msg = checked ? check[name] : [];
      
      return checked;
    }
  } 
};

export default ValidationManager
