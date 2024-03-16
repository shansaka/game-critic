import AsyncStorage from "@react-native-async-storage/async-storage";

export async function isLoggedIn() {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (userId !== null) {
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getSessionItem(itemName) {
  try {
    const item = await AsyncStorage.getItem(itemName);
    if (item == null) {
      return "";
    }
    return item;
  } catch (e) {
    console.log(e);
    return "";
  }
}

export async function logIn(data) {
  try {
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("userId", data.userId);
    await AsyncStorage.setItem("username", data.username);
    await AsyncStorage.setItem("refreshToken", data.refreshToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function refreshToken(newToken, newRefreshToken) {
  try {
    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function logOut() {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("refreshToken");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
