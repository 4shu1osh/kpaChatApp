
import  AsyncStorage  from '@react-native-async-storage/async-storage'

export const setUserDataAsync = async (userData: any) => {
    try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
        console.log(error);
    }
    }
    export const getUserDataAsync = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                return JSON.parse(userData);
            }
            else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    export const removeUserDataAsync = async () => {
        try {
            await AsyncStorage.removeItem('userData');
        } catch (error) {
            console.log(error);
        }
    }


