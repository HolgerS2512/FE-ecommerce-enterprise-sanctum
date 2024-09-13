import i18n from '../i18n/config';

const HttpTranslator = ({ status, data }) => {
  // Common
  let code = 500;
  const message = data?.message;
  const validator = data?.validator;
  // Is Available
  const hasMessage = message !== undefined && message[0];
  const hasValidator = validator !== undefined && typeof validator === 'object';
  // Handling
  let customMsg = hasMessage ? `error.${message[1]}` : null;

  if (hasValidator) {
    const arr = Object.entries(validator).map((values, i) => {
      return `${i18n.t('input.' + values[0])} - ${values[1][0]}`;
    });
    customMsg = arr.join('\n');
  }

  switch (status) {
    case 400: code = 400; break;
    case 401: code = 401; break;
    case 403: code = 403; break;
    case 404: code = 404; break;
    case 429: code = 429; break;

    case 500: code = 500; break;
    case 502: code = 502; break;
    case 503: code = 503; break;
    case 504: code = 504; break;
  
    default: break;
  }

  return (i18n.t(`${hasValidator ? '' : 'http.'}${customMsg ?? code}`));
}

export default HttpTranslator
