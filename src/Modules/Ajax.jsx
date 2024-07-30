export const getAjax = (path, success) => {
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  const url = `${import.meta.env.VITE_API_BASE_URL}/api${path}`;
  const token = localStorage.getItem("xFs_at" || false);

  xhr.open('GET', url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3) success(xhr);
  }
  if (token) {
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send();

  return xhr;
}

export const postAjax = (path, payload, success) => {
  const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  const url = `${import.meta.env.VITE_API_BASE_URL}/api${path}`;
  const params = typeof payload == 'string' ? payload : Object.keys(payload).map((k) => {
    return encodeURIComponent(k) + '=' + encodeURIComponent(payload[k]) }
  ).join('&');
  const token = localStorage.getItem("xFs_at" || false);

  xhr.open('POST', url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3) success(xhr);
  }
  if (token) {
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
  }
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  return xhr;
}