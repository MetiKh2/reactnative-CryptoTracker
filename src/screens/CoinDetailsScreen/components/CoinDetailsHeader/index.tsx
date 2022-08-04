import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchList } from "../../../../context/WatchListContext";

interface CoinDetailsHeaderProps {
  image: string;
  symbol: string;
  market_cap_rank: number;
  coinId: string;
}

const CoinDetailsHeader = ({
  image,
  symbol,
  market_cap_rank,
  coinId,
}: CoinDetailsHeaderProps) => {
  const navigation = useNavigation();
  const watchList = useWatchList();
  const checkIfCoinIsWatchListed = () =>
    watchList?.watchListCoinIds.some((coinIdValue) => coinIdValue == coinId);
function handleWatchListCoin() {
  if(checkIfCoinIsWatchListed())return watchList?.removeWatchlistCoinId(coinId)
  else return watchList?.storeWatchlistCoinId(coinId)
}
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        name="chevron-back"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image source={{ uri: image }} style={{ width: 25, height: 25 }} />
        <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
        <View style={styles.rankContainer}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 10 }}>
            #{market_cap_rank}
          </Text>
        </View>
      </View>
      {/* <EvilIcons name="user" size={30} color="white" /> */}
      <AntDesign name={checkIfCoinIsWatchListed()?"star":"staro"} size={22} color="white" onPress={handleWatchListCoin}/>
    </View>
  );
};

export default CoinDetailsHeader;
