import {  ActivityIndicator, FlatList,  Text,  View } from 'react-native'
import React, { Suspense } from 'react'
import styles from './styles'
import PortfolioAssetsList from './components/PortfolioAssetsList'
const PortfolioScreen = () => {
  return (
    <View>
      <Suspense fallback={<ActivityIndicator />}>
      <PortfolioAssetsList/>
      </Suspense>
    </View>
  )
}

export default PortfolioScreen

