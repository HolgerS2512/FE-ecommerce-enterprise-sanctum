class CookieManager {
  // Setzt ein Cookie mit Name, Wert und optionalen Optionen (wie expires, path, domain)
  setCookie(name, value, options = {}) {
    // Serialisiert das Objekt in einen JSON-String
    const cookieValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      cookieValue
    )}`;

    if (options.expires) {
      if (typeof options.expires === "number") {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 1000); // expires in Sekunden
        cookieString += `; expires=${date.toUTCString()}`;
      } else if (options.expires instanceof Date) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    if (options.path) {
      cookieString += `; path=${options.path ?? "/"}`;
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain ?? `${import.meta.env.VITE_API_BASE_URL}`}`;
    }

    if (options.secure) {
      cookieString += "; secure";
    }

    if (options.httpOnly) {
      cookieString += "; HttpOnly"; // HttpOnly wird nur gesetzt, wenn true
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    } else {
      cookieString += `; samesite=Strict`;
    }

    document.cookie = cookieString;
  }

  // Ruft den Wert eines Cookies nach seinem Namen ab
  getCookie(name) {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim(); // Entfernt führende Leerzeichen
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null; // Cookie nicht gefunden
  }

  // Löscht ein Cookie, indem es mit einem negativen Ablaufdatum gesetzt wird
  // expires: 'Thu, 01 Jan 1988 00:00:00 GMT',
  deleteCookie(name, path, domain, secure, sameSite) {
    this.setCookie(name, "", {
      expires: -1, // Ablaufzeit in der Vergangenheit
      path: path ?? '/',
      domain: domain ?? `${import.meta.env.VITE_API_BASE_URL}`.replace('http://', ''),
      sameSite: sameSite ?? 'Strict',
    });
  }
    
  // Ruft alle Cookies als Objekt ab
  getAllCookies() {
    const cookies = document.cookie.split("; ");
    const cookieObj = {};

    cookies.forEach(cookie => {
      const [name, value] = cookie.split("=");
      cookieObj[decodeURIComponent(name)] = decodeURIComponent(value);
    });

    return cookieObj;
  }


}

export default CookieManager;
