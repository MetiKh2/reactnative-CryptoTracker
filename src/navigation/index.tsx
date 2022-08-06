import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import MaterialBottomTabsNavigator from './MaterialBottomTabsNavigator';
import AddNewAssetScreen from './../screens/AddNewAssetScreen/index';

const Stack = createNativeStackNavigator();

const Navigation=()=>{
return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="BottomTabs" component={MaterialBottomTabsNavigator} />
        <Stack.Screen name="CoinDetails" component={CoinDetailsScreen} />
        <Stack.Screen name="AddNewAsset" component={AddNewAssetScreen} 
        options={{
            headerShown:true,
            title: 'Add New Asset ',
            headerTintColor:'#fff',
            headerStyle:{
                backgroundColor:'#121212'
            },
            
        }}/>
    </Stack.Navigator>
)
}

export default Navigation;