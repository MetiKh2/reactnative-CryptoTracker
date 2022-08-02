import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CoinItem from './../../components/CoinItem/index';
import cryptoCurrencies from '../../../assets/data/cryptoCurrencies.json'

const HomeScreen = () => {
  return (
    <View>
        <FlatList 
      data={cryptoCurrencies}
      renderItem={({item})=>(
      <CoinItem marketCoin={item} />
      )}/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})