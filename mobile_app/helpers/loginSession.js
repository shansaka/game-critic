import AsyncStorage from "@react-native-async-storage/async-storage";

// Check if the user is logged in
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

// Get the session item
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

// Log in the user
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

// Update the token
export async function updateToken(newToken, newRefreshToken) {
  try {
    await AsyncStorage.setItem("token", newToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Log out the user
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
