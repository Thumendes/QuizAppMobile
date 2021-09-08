import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  static async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);

      return true;
    } catch (error) {
      return false;
    }
  }

  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;

      const jsonValue = JSON.parse(value);
      return jsonValue;
    } catch (error) {
      return null;
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default Storage;
