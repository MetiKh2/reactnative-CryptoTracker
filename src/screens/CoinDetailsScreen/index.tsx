import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import crypto from "../../../assets/data/crypto.json";
import styles from "./styles";
import CoinDetailsHeader from "./components/CoinDetailsHeader";
import { AntDesign } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { useRoute } from "@react-navigation/native";
import {
  getCoinDetailsData,
  getCoinMarketChart,
} from "./../../services/rquests";
import { CoinDetails, CoinMarketChart } from "../../interfaces";
const CoinDetailsScreen = () => {
  const route = useRoute();
  const { params } = route;
  const [coinValue, setCoinValue] = useState("1");
  const [coinChart, setCoinChart] = useState<CoinMarketChart>({ prices: [] });
  const [coinData, setCoinData] = useState<CoinDetails>({
    id:'',
    image: { small: "" },
    name: "",
    market_cap_rank: 0,
    symbol: "",
    market_data: { current_price: { usd: 0 }, price_change_percentage_24h: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [usdValue, setUsdValue] = useState<string>();
  const {usd}=coinData.market_data.current_price;
  useEffect(() => {
    setUsdValue(usd.toString());
  }, [usd])
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCoinDetailsData(params.coinId);
      const chart = await getCoinMarketChart(params.coinId);
      setCoinData(data);
      setCoinChart(chart);
      setLoading(false);
    };
    fetchData();
  }, [params.coinId]);

  const percentageColor =
    coinData.market_data.price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  // const chartColor = usd > prices[0][1] ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;
  const changeCoinValue = (value: string) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * usd).toFixed(3).toString());
  };

  const changeUsdValue = (value: string) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / usd).toFixed(3).toString());
  };
  return (
    <ScrollView>
      {loading || !coinData || !coinChart ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <View style={{ paddingHorizontal: 10 }}>
            <CoinDetailsHeader
            coinId={coinData.id}
              market_cap_rank={coinData.market_cap_rank}
              image={coinData.image.small}
              symbol={coinData.symbol}
            />
            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.name}>{coinData.name}</Text>
                <Text style={styles.currentPrice}>
                  {usd}
                </Text>
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
                  name={
                    coinData.market_data.price_change_percentage_24h < 0
                      ? "caretdown"
                      : "caretup"
                  }
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.priceChange}>
                  {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <LineChart
              data={{
                labels: coinChart.prices.map(
                  (price) =>
                    // `${new Date(price[0]).getFullYear().toString()}-${new Date(
                    //   price[0]
                    // )
                    //   .getMonth()
                    //   .toString()}`
                    `${new Date(price[0]).toLocaleDateString()}`
                ),
                datasets: [
                  {
                    data: coinChart.prices.map((price) => price[1]),
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
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <Text style={{ color: "white", alignSelf: "center" }}>
                {coinData.symbol.toUpperCase()}
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
        </>
      )}
    </ScrollView>
  );
};

export default CoinDetailsScreen;
