import { Image, Text, View } from "react-native";
import React from "react";
import styles from "./styles";
import { AntDesign } from '@expo/vector-icons';

const PortfolioAssetItem = ({ assetItem }: { assetItem: any }) => {
  const {
    currentPrice,
    image,
    name,
    priceChangePercentage,
    quantityBought,
    symbol,
  } = assetItem;
  const isChangePositive = () => priceChangePercentage >= 0;

  const renderHoldings = () => (quantityBought * currentPrice).toFixed(2)
   return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: 30, height: 30,marginRight:5 }} />
      <View>
      <Text style={styles.title}>{name}</Text>
        <Text style={styles.ticker}>{symbol}</Text>
      </View>
      <View style={{ marginLeft: "auto", alignItems: 'flex-end',paddingRight:10 }}>
      <Text style={styles.title}>{currentPrice}</Text>
        <View style={{flexDirection:'row'}}>
        <AntDesign
            name={isChangePositive() ? "caretup" : "caretdown"}
            size={12}
            color={isChangePositive() ? "#16c784" : "#ea3943"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text
            style={{
              color: isChangePositive() ? "#16c784" : "#ea3943",
              fontWeight: "600",
            }}
          >
            {priceChangePercentage?.toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.title}>${renderHoldings()}</Text>
        <Text style={styles.ticker}>
          {quantityBought} {symbol}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioAssetItem;
