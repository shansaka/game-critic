import AsyncStorage from '@react-native-async-storage/async-storage';

export async function isLoggedIn() {
    try {
        const userToken = await AsyncStorage.getItem('userToken');
        if(userToken !== null) {
          return true;
        }
        return false;
      } catch(e) {
        console.log(e);
        return false;
      }
}

export async function logIn(token) {
    try {
        await AsyncStorage.setItem('userToken', token);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
}