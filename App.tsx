import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, I18nManager } from "react-native";
import CoinDetailsScreen from "./src/screens/CoinDetailsScreen";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import Constants from "expo-constants"
import { WatchListProvider } from "./src/context/WatchListContext";
export default function App() {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  return (
    <NavigationContainer theme={{
      colors:{
        background: '#121212'
      }
    }}>
     <WatchListProvider>
     <View style={styles.container}>
        <Navigation />
        <StatusBar style="light" />
      </View>
     </WatchListProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: Constants.statusBarHeight
  },
});
