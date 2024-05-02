import Exception404 from '@/components/stateless/Exception/exception404';
import routes from '@/routers/index';

export const flattenRoutes = (arr) =>
  arr.reduce((prev, item) => {
    if (Array.isArray(item.children)) {
      prev.push(item);
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item);
  }, []);

export const getKeyName = (pathName = '/404') => {
  const thePath = pathName.split('?')[0];
  const curRoute = flattenRoutes(routes)
    .filter((item) => !item.index)
    .filter((item) => item.key?.indexOf(thePath) !== -1);
  if (!curRoute[0]) {
    return {
      title: 'Not Found',
      tabKey: '/404',
      element: <Exception404 />,
      i18nKey: 'notFound',
    };
  }

  const { name, key, element, index, path, auth, i18nKey } = curRoute[0];
  return { index: index ?? false, path, auth, title: name, tabKey: key, element, i18nKey };
};

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key);
  try {
    if (value) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch (error) {
    return value;
  }
};

/**
 * Sets the value of a key in local storage.
 *
 * @param {string} key - The key to set in local storage.
 * @param {any} value - The value to set for the key.
 * @return {void} This function does not return a value.
 */
export const setLocalStorage = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Removes a key from local storage.
 *
 * @param {string} key - The key to remove from local storage.
 * @return {void} This function does not return a value.
 */
export const removeLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  window.localStorage.clear();
};
