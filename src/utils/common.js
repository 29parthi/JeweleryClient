export const getUserData = () => {
    const userStr = sessionStorage.getItem('userData');
    if (userStr) return JSON.parse(userStr);
    else return null;
  }
  export const removeUserSession = () => {
    sessionStorage.removeItem('userData');
  }
  
  export const setUserSession = (userData) => {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }