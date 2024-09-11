import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"

const HttpStatusMsg = ({ error, msg = '', tabIndex = 1 }) => {
  const { t } = useTranslation();
  const targetRef = useRef(null);
  const { status } = error?.response;
  let code = 0;

  useEffect(() => {
    targetRef.current.focus();
  }, [error]);

  if (Boolean(msg.length) &&  msg.includes('SQLSTATE')) {
    msg = t('http.5');
  } else if (Boolean(msg.length) && typeof msg === 'object') {
    let vault = '';
    const size = msg.length;
    msg.forEach((el, i) => {
      const space = i !== size - 1 ? ' ' : '';
      vault += `${el}${size > 1 ? space : ''}`;
    });
    msg = vault;
  }

  if (typeof msg === 'object') {
    Object.values(msg).forEach((values) => {
      msg = values[0];
    });
  }
  // new

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
  
    default:
      break;
  }

  // switch (Math.floor(status / 100)) {
  //   case 4:
  //     break;
  //   case 5:
  //     break;
  
  //   default:
  //     break;
  // }

  const message = t('http.' + code);

  return (
    <div className='http-status-msg' role="alert" aria-live="assertive">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
      </span>
      <p ref={targetRef} aria-readonly={message} tabIndex={tabIndex}>{message}</p>
    </div>
  )
}

export default HttpStatusMsg
