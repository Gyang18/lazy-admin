/**
 * @Description: user auth
 * @author yang
 * @date 2019/9/21
 */

const TokenKey: string = 'token';

function getToken(): string | null {
  return window.localStorage.getItem(TokenKey) || null;
}
function setToken(key: string): void {
  if (!key) {
    throw Error('Token not passed in');
  }
  window.localStorage.setItem(TokenKey, key);
}
function removeToken(): void {
  window.localStorage.removeItem(TokenKey);
}

export {
  getToken,
  setToken,
  removeToken,
};
