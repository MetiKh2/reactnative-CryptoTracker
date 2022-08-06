import {FlatList } from 'react-native'
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
     renderItem={({ item }) => <CoinItem marketCoin={item} />}
    />
  )
}

export default WatchListScreen
