import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import styles from './styles';

interface CoinDetailsHeaderProps{
  image:string;
  symbol:string;
  market_cap_rank:number;
}

const CoinDetailsHeader = ({image,symbol,market_cap_rank}:CoinDetailsHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Ionicons name="chevron-back" size={30} color="white" />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
        <Text style={{ color: "white",fontWeight:'bold',fontSize:10 }}>#{market_cap_rank}</Text>
        </View>
      </View>
      <EvilIcons name="user" size={30} color="white" />
    </View>
  )
}

export default CoinDetailsHeader
