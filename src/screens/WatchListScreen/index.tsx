import {FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useWatchList } from '../../context/WatchListContext'
import CoinItem from './../../components/CoinItem/index';
import { getWatchListedCoins } from '../../services/rquests';

const WatchListScreen = () => {
    const watchList=useWatchList()
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchWatchedListCoins=async()=>{
      if(loading||watchList?.watchListCoinIds.length<1) return;
      setLoading(true)
    const res= await getWatchListedCoins(watchList?.watchListCoinIds.join(','))
      setCoins(res);
      setLoading(false)
    }
    useEffect(() => {
      fetchWatchedListCoins()
    }, [watchList?.watchListCoinIds])
    
    return (
    <FlatList
      data={coins}
     renderItem={({ item }) => <CoinItem marketCoin={item} />
    }
    ListEmptyComponent={<View style={{alignItems: 'center'}}>
      <Text style={{color:'white',fontSize:20}}>You're watch list is empty</Text>
      </View>}
    />
  )
}

export default WatchListScreen
