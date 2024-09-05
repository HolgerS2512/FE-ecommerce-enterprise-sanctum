export const find = (data) => {
  const result = [];

  return {
    byId: (id) => {
      Object.values(data).forEach((obj) => {
        if (obj.id === id) result.push(obj);
      });
      return result[0];
    },
    byActiveAll: () => {
      Object.values(data).forEach((obj) => {
        if (obj.active) result.push(obj);
      });
      return result;
    },
    byActiveFirst: () => {
      Object.values(data).forEach((obj) => {
        if (obj.active) result.push(obj);
      });
      return result[0];
    },
    byActiveLast: () => {
      Object.values(data).forEach((obj) => {
        if (obj.active) result.push(obj);
      });
      return result[result.length - 1];
    },
    byNoneActive: () => {
      Object.values(data).forEach((obj) => {
        if (!obj.active) result.push(obj);
      });
      return result;
    },
  }
}

export const findInOptions = (data) => {
  const result = [];

  return {
    byValue: (condition) => {
      Object.values(data).forEach((obj) => {
        const { value } = obj;
        if (value === condition) result.push(obj);
      });
      return result[0];
    },
    byLabel: (condition) => {
      Object.values(data).forEach((obj) => {
        const { label } = obj;
        if (label === condition) result.push(obj);
      });
      return result[0];
    },
  }
}

export const findObjsInArr = (arr) => {
  return {
    byLength: () => {
      if (arr[0] === undefined) return;
      const counter = [];
      Object.values(arr).forEach((obj) => {
        counter.push(obj.cookies.length);
      });
      return counter.reduce((a, b) => a + b);
    }
  }
}
