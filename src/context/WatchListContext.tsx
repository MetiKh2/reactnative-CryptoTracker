import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, createContext, useState, useEffect } from "react";

interface WatchListContext {
  watchListCoinIds: string[];
  storeWatchlistCoinId:(coinId: string) =>Promise<void>;
  removeWatchlistCoinId:(coinId: string) =>Promise<void>;
}
const WatchListContext = createContext<WatchListContext | null>(null);

export const WatchListProvider = ({ children }: { children: JSX.Element }) => {
  const [watchListCoinIds, setWatchListCoinIds] = useState<string[]>([]);
  async function getWatchListData() {
    try {
        const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
        setWatchListCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
    getWatchListData();
  }, []);
  const storeWatchlistCoinId = async (coinId:string) => {
    try {
      const newWatchlist = [...watchListCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem('@watchlist_coins', jsonValue);
      setWatchListCoinIds(newWatchlist);
    } catch (e) {
      console.log(e)
    }
  }
  const removeWatchlistCoinId = async (coinId:string) => {
    const newWatchlist = watchListCoinIds
    .filter((coinIdValue) => coinIdValue !== coinId);
    const jsonValue = JSON.stringify(newWatchlist);
    await AsyncStorage.setItem('@watchlist_coins', jsonValue);
    setWatchListCoinIds(newWatchlist);
  }
  return (
    <WatchListContext.Provider value={{ watchListCoinIds ,storeWatchlistCoinId, removeWatchlistCoinId}}>
      {children}
    </WatchListContext.Provider>
  );
};

export const useWatchList = () => useContext(WatchListContext);
