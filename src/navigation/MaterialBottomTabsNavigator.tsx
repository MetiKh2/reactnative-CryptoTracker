import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './../screens/HomeScreen/index';
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Foundation  from '@expo/vector-icons/Foundation'
import WatchListScreen from './../screens/WatchListScreen/index';
import PortfolioScreen from './../screens/PortfolioScreen/index';
const Tab = createMaterialBottomTabNavigator();
const MaterialBottomTabsNavigator = () => {
  return (
    <Tab.Navigator inactiveColor='grey' activeColor='white'
    screenOptions={{}} barStyle={{
        backgroundColor: '#181818',
        alignContent:'center',
        paddingBottom:0
    }} >
    <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon:({focused,color})=>{
        return <Entypo name={'home'} size={focused?24:18} color={color}/>
    }}} />
     <Tab.Screen name="Portfolio" component={PortfolioScreen} options={{tabBarIcon:({focused,color})=>{
        return <Foundation  name={'graph-pie'} size={focused?24:18} color={color}/>
    }}} />
    <Tab.Screen name="WatchList" component={WatchListScreen} options={{tabBarIcon:({focused,color})=>{
        return <FontAwesome name={'star'} size={focused?24:18} color={color}/>
    }}} />
  </Tab.Navigator>
  )
}

export default MaterialBottomTabsNavigator