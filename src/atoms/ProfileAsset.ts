import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom, selector } from "recoil";
import { getWatchListedCoins } from "../services/rquests";

export const allPortfolioBoughtAssets = selector({
    key: 'all_profile_bought_assets',
    get: async (state) => {
        const jsonValue=await AsyncStorage.getItem('@portfolio_coins')
        return jsonValue!=null?JSON.parse(jsonValue):[];
    }
});
export const allPortfolioBoughtAssetsInStorage = atom({
  key: 'allPortfolioBoughtAssetsInStorage',
  default: allPortfolioBoughtAssets,
})

export const allPortfolioBoughtAssetsFromAPI = selector({
    key: 'allPortfolioBoughtAssetsFromAPI',
    get: async ({get}) => {
      const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage)
      const portfolioAssetsMarketData =
       await getWatchListedCoins
       ( boughtPortfolioAssets
        .map((portfolioAsset) => portfolioAsset.id).join(','))
  
      const boughtAssets = boughtPortfolioAssets.map((boughtAsset) => {
        const portfolioAsset = portfolioAssetsMarketData.filter((item) => boughtAsset.id === item.id)[0]
        return {
          ...boughtAsset,
          currentPrice: portfolioAsset.current_price,
          priceChangePercentage: portfolioAsset.price_change_percentage_24h
        }
      })
  
      return boughtAssets.sort((item1, item2) => (item1.quantityBought * item1.currentPrice) < (item2.quantityBought * item2.currentPrice))
    }
  })
export const allPortfolioAssets = atom({
    key: 'all_profile_assets',
    default: allPortfolioBoughtAssetsFromAPI
})

 

