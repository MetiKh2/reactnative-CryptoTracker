import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import MaterialBottomTabsNavigator from './MaterialBottomTabsNavigator';

const Stack = createNativeStackNavigator();

const Navigation=()=>{
return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="BottomTabs" component={MaterialBottomTabsNavigator} />
        <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
)
}

export default Navigation;