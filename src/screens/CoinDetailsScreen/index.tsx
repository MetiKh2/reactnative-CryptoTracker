import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import crypto from "../../../assets/data/crypto.json";
import styles from "./styles";
import CoinDetailsHeader from "./components/CoinDetailsHeader";
import { AntDesign } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
const CoinDetailsScreen = () => {
  const {
    image: { small },
    name,
    prices,
    market_data: {
      market_cap_rank,
      current_price: { usd },
      price_change_percentage_24h,
    },
    symbol,
  } = crypto;
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState(usd.toString());
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  // const chartColor = usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;
  const changeCoinValue = (value: string) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * usd).toFixed(6).toString());
  };

  const changeUsdValue = (value: string) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / usd).toFixed(6).toString());
  };
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 10 }}>
        <CoinDetailsHeader
          market_cap_rank={market_cap_rank}
          image={small}
          symbol={symbol}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.currentPrice}>{usd}</Text>
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        <LineChart
          data={{
            labels: prices.map(
              (price) =>
                `${new Date(price[0]).getFullYear().toString()}-${new Date(
                  price[0]
                )
                  .getMonth()
                  .toString()}`
            ),
            datasets: [
              {
                data: prices.map((price) => price[1]),
              },
            ],
          }}
          width={Dimensions.get("window").width - 10} // from react-native
          height={350}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={2}
          xLabelsOffset={-2}
          chartConfig={{
            backgroundColor: "#585858",
            backgroundGradientFrom: "#585858",
            backgroundGradientTo: "#000",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "3",
              strokeWidth: "0",
            },
          }}
          yLabelsOffset={-1}
          verticalLabelRotation={50}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 5,
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white", alignSelf: "center" }}>
            {symbol.toUpperCase()}
          </Text>
          <TextInput
            style={styles.input}
            value={coinValue}
            keyboardType="numeric"
            onChangeText={changeCoinValue}
          />
        </View>

        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
          <TextInput
            style={styles.input}
            value={usdValue}
            keyboardType="numeric"
            onChangeText={changeUsdValue}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CoinDetailsScreen;
