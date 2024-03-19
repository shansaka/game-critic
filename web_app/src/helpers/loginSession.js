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

export function isAdmin() {
  try {
    const item = localStorage.getItem("isAdmin");
    if (item === "true") {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function logIn(data, isAdmin = false) {
  try {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("isAdmin", isAdmin);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export function updateToken(newToken, newRefreshToken) {
  try {
    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", newRefreshToken);
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
    localStorage.removeItem("isAdmin");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
