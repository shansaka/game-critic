export function isLoggedIn() {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function getSessionItem(itemName) {
  try {
    const item = localStorage.getItem(itemName);
    if (item == null) {
      return "";
    }
    return item;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export function logIn(data) {
  try {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("refreshToken", data.refreshToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function logOut() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("refreshToken");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
