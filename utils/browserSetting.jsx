
export const setToken = (token) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('token', token);
  }
};

export const getToken = () => {
  if (typeof window !== 'undefined' && window.localStorage)  {
    return localStorage.getItem('token');
  }
  return null;
};

export const getItemLocalStorage = (key) => {
  if (typeof window !== 'undefined' && window.localStorage)  {
    const item = localStorage.getItem(key);
    return item;
  }
  return '';
};

export const getJsonObjLocalStorage = (key) => {
  if (typeof window !== 'undefined' && window.localStorage)  {
    const obj = localStorage.getItem(key);
    return obj && obj !== 'undefined' ? JSON?.parse(obj) : false;
  }
  return '';
};

export const setItemLocalStorage = (key , value) => {
  if (typeof window !== 'undefined' && window.localStorage)  {
    localStorage.setItem(key, value);
  }
};

export const removeItemLocalStorage = (key) => {
  if (typeof window !== 'undefined' && window.localStorage)  {
    localStorage.removeItem(key);
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const value = getItemLocalStorage('ribbonCut');
    localStorage.clear();
    if (value) setItemLocalStorage('ribbonCut', value);
  }
};
