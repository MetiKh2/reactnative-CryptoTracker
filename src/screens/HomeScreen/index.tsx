import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import React, { useEffect } from "react";
import CoinItem from "./../../components/CoinItem/index";
import { useState } from "react";
import { getMarketData } from "./../../services/rquests";

const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async (pageNumber:number) => {
    if(loading)return;
    setLoading(true);
    const res = await getMarketData(pageNumber);
    setCoins(prev=>[...prev,...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData(1);
  }, []);
  const refreshCoins= async()=>{
    if(loading)return;
    setLoading(true);
    const res = await getMarketData();
    setCoins(res);
    setLoading(false);
  }
  if(coins.length<1||loading)return <ActivityIndicator size={"large"}/>
  return (
    <View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{color:'white',fontSize:25,letterSpacing:1,paddingHorizontal:20,paddingBottom:5,fontFamily:'DroidSans'}}>Crypto assets</Text>
      <Text style={{color:'grey',fontSize:13,letterSpacing:.5,paddingHorizontal:2,paddingBottom:5,fontFamily:'DroidSans'}}>Powered by Meti KH</Text>
      </View>
      <FlatList
      keyExtractor={(item,index)=>`${item?.id}-${index}`}
      refreshControl={
        <RefreshControl refreshing={loading} tintColor={'white'} onRefresh={refreshCoins}/>
      }
      onEndReached={()=>fetchData((coins.length/50)+1)}
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
      />
    </View>
  );
};

export default HomeScreen;
