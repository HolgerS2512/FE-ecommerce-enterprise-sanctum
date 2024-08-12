import axiosClient from "../axios-clint";

/**
 *
 * Base Values
 *
 */
const token = localStorage.getItem("xFs_at" || "");
const baseURL = import.meta.env.VITE_API_BASE_URL;
const xhr = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : new ActiveXObject("Microsoft.XMLHTTP");

/**
 *
 * GET Methods
 *
 */
export const FetchAsync = async (path) => {
  try {
    const res = await axiosClient.get(path);
    if (res?.data) {
      return res.data;
    }
  } catch (err) {
    const { message } = err?.response?.data;
    throw new Error(message);
  }
};

export const getAjax = (path, success) => {
  const url = `${baseURL}/api${path}`;

  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3) success(xhr);
  };
  if (token) {
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send();

  return xhr;
};

export const getFetch = async (path) => {
  try {
    const response = await fetch(`${baseURL}/api${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
    if (response.ok) {
    } else {
      const data = await response.json();
      // const { message } = err?.response?.data;
      // throw new Error(message);
      console.log(data);
    }
  } catch (err) {
    const { message } = err?.response?.data;
    throw new Error(message);
  }
};

/**
 *
 * POST Methods
 *
 */
export const postAjax = (path, payload, success) => {
  const url = `${baseURL}/api${path}`;
  const params =
    typeof payload == "string"
      ? payload
      : Object.keys(payload)
          .map((k) => {
            return encodeURIComponent(k) + "=" + encodeURIComponent(payload[k]);
          })
          .join("&");

  xhr.open("POST", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3) success(xhr);
  };
  if (token) {
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(params);

  return xhr;
};
