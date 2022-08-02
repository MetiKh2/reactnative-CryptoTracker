import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, I18nManager } from "react-native";
import CoinDetailsScreen from "./src/screens/CoinDetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
export default function App() {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  return (
    <View style={styles.container}>
      <CoinDetailsScreen/>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
});
