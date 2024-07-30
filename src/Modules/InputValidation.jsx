
const InputValidation = (obj) => {
  const reObj = {};

  Object.entries(obj).forEach((row) => {
    // console.log(row[0], row[1])

    switch (row[0]) {
      case 'firstname':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        // length (override regex) (min, max)
        if ((rules[row[0]].min[0]) >= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].min[1]);
        }
        if ((rules[row[0]].max[0]) <= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].max[1]);
        }
        break;

      case 'lastname':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        // length (override regex) (min, max)
        if ((rules[row[0]].min[0]) >= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].min[1]);
        }
        if ((rules[row[0]].max[0]) <= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].max[1]);
        }
        break;

      case 'email':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        // length (override regex) (min, max)
        if ((rules[row[0]].min[0]) >= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].min[1]);
        }
        if ((rules[row[0]].max[0]) <= row[1].length) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].max[1]);
        }
        break;

      case 'pin':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        break;

      case 'day':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        break;

      case 'month':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        break;

      case 'year':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        break;

      case 'salutation':
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]] = [];
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        break;

      case 'password':
        if (!(rules[row[0]].regex[0]).test(row[1]) || (rules[row[0]].min[0]) >= row[1].length || (rules[row[0]].max[0]) <= row[1].length) {
          reObj[row[0]] = [];
        }
        // regex
        if (!(rules[row[0]].regex[0]).test(row[1])) {
          reObj[row[0]].push(rules[row[0]].regex[1]);
        }
        // length (min, max)
        if ((rules[row[0]].min[0]) >= row[1].length) {
          reObj[row[0]].push(rules[row[0]].min[1]);
        }
        if ((rules[row[0]].max[0]) <= row[1].length) {
          reObj[row[0]].push(rules[row[0]].max[1]);
        }
        break;
    
      default: break;
    }
  });
  return reObj;
}

export default InputValidation

const emailReg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

// Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-255 characters long.
const pwdReg = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,255}$/;

const nameReg = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,50}$/;

const pinReg = /^\d{5}$/;

const salutReg = /^[a-z]{1}$/;

const dayReg = /^[0-9]{1,2}$/;

const monthReg = /^[0-9]{1,2}$/;

const yearReg = /^[0-9]{4}$/;

const rules = {
  firstname: {
    regex: [nameReg, 'error.validfirstname'],
    min: [2, 'error.required'],
    max: [50, 'error.max50'],
  },
  lastname: {
    regex: [nameReg, 'error.validlastname'],
    min: [2, 'error.required'],
    max: [50, 'error.max50'],
  },
  email: {
    regex: [emailReg, 'error.validemail'],
    min: [8, 'error.required'],
    max: [255, 'error.max255'],
  },
  password: {
    regex: [pwdReg, 'error.validpassword'],
    min: [8, 'error.required'],
    max: [255, 'error.max255'],
  },
  pin: {
    regex: [pinReg, 'error.validpin'],
  },
  // Birthday
  day: {
    regex: [dayReg, 'error.day'],
  },
  month: {
    regex: [monthReg, 'error.month'],
  },
  year: {
    regex: [yearReg, 'error.year'],
  },
  // Salution
  salutation: {
    regex: [salutReg, 'error.salutation'],
  },
}
