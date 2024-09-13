
const HttpTranslator = ({ status, data }) => {
  // Common
  const { message } = data;
  // Handling
  const quest = message !== undefined && message[0];
  const customMsg = quest ? `error.${message[1]}` : null;
  let code = 500;

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

  return `http.${customMsg ?? code}`;
}

export default HttpTranslator
