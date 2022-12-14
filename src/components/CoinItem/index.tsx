import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import {useNavigation} from "@react-navigation/native"
interface CoinItemProps {
  marketCoin: {
    name: string;
    symbol: string;
    image: string;
    market_cap_rank: number;
    market_cap: number;
    current_price: number;
    market_cap_change_percentage_24h: number;
    id:string;
  };
}

const CoinItem = ({
  marketCoin: {
    name,
    current_price,
    market_cap,
    market_cap_change_percentage_24h,
    image,
    market_cap_rank,
    symbol,
    id
  },
}: CoinItemProps) => {
  const navigation=useNavigation();
  const normalizeMarketCap = (marketCap:number) => {
    if (marketCap > 1e12) {
      return `${(marketCap / 1e12).toFixed(3)} T`;
    }
    if (marketCap > 1e9) {
      return `${(marketCap / 1e9).toFixed(3)} B`;
    }
    if (marketCap > 1e6) {
      return `${(marketCap / 1e6).toFixed(3)} M`;
    }
    if (marketCap > 1e3) {
      return `${(marketCap / 1e3).toFixed(3)} K`;
    }
    return marketCap;
  };
  const percentageColor=market_cap_change_percentage_24h>0?'#16c784':'#ea3943';
  return (
    <Pressable style={styles.coinContainer} onPress={()=>navigation.navigate('CoinDetails',{coinId:id})}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={market_cap_change_percentage_24h>0?'caretup':'caretdown'}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={[styles.text,{color:percentageColor}]}>{market_cap_change_percentage_24h.toFixed(2)}</Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto",alignItems:'flex-end' }}>
        <Text style={styles.title}>{current_price}</Text>
        <Text style={styles.text}>MCap {normalizeMarketCap(market_cap)}</Text>
      </View>
    </Pressable>
  );
};

export default CoinItem;
