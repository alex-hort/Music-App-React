import  AsyncStorage  from "@react-native-async-storage/async-storage";

export const saveToAsyncStorage = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}
export const getFromAsyncStorage = async (key: string) => {
    return await AsyncStorage.getItem(key)
}

export const claerAsyncStorage = async () => {
    await AsyncStorage
}

export enum Keys{
    AUTH_TOKEN = 'AUTH_TOKEN'
}