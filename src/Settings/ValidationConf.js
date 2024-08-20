export const Regex = {
  firstname: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,50}$/,
  lastname: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,50}$/,
  email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,255}$/,
  pin: /^\d{5}$/,
  salutation: /^[a-z]{1}$/,
  day: /^[0-9]{1,2}$/,
  month: /^[0-9]{1,2}$/,
  year: /^[0-9]{4}$/,
  phone: /^[\+0]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  zip: /^\d{4,5}(-\d{4})?$|^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$|^\d{3}-\d{4}$/,
  city: /^(?![\s'.-]+$)[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'.-]+$/,
  details: /^(?:[A-Za-z0-9\s\-/.,#]*)?$/,
  street: /^([A-Za-zäöüÄÖÜß.\-\s]+)\s+(\d{1,4}[a-zA-Z]?(?:[-\s]\d{1,4}[a-zA-Z]?)?)$/,
  country: /^[A-Z]{2}$/,
  state: /^([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s'.-]*)$/,
};

// Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-255 characters long.


export const Rules = {

  required: 'error.required',

  firstname: {
    min: 2,
    max: 50,
  },
  lastname: {
    min: 2,
    max: 50,
  },
  email: {
    min: 8,
    max: 255,
  },
  password: {
    min: 8,
    max: 255,
  },
  street: {
    min: 6,
    max: 150,
  },
  message: {
    min: 8,
    max: 1000,
  },
  pin: {
    min:5,
    max:5,
  }
  
};