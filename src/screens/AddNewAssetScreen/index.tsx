import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchableDropdown from "react-native-searchable-dropdown";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/ProfileAsset";
import { getAllCoins, getCoinDetailsData } from "./../../services/rquests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { useRecoilState } from 'recoil';
const AddNewAssetScreen = () => {
  const [quantity, setQuantity] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoinId, setSelectedCoinId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState<any>(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const navigation = useNavigation();
  const fetchAllCoins = async () => {
    AsyncStorage.clear();
    if (loading) {
      return;
    }
    setLoading(true);
    const allCoins = await getAllCoins();
    setAllCoins(allCoins);
    setLoading(false);
  };
  const fetchCoinInfo = async () => {
    if (loading) return;
    setLoading(true);
    const coinInfo = await getCoinDetailsData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllCoins();
  }, []);
  useEffect(() => {
    if (selectedCoinId) {
      fetchCoinInfo();
    }
  }, [selectedCoinId]);
  const onAddNewAsset =async () => {
    const newAsset={
      id:selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name:selectedCoin.name,
      image:selectedCoin.image.small,
      symbol:selectedCoin?.symbol?.toUpperCase(),
      quantityBought:parseFloat(quantity),
      priceBought:selectedCoin?.current_price?.usd
    }
    const newAssets=[...assetsInStorage,newAsset]
    const jsonValue=JSON.stringify(newAssets)
    await AsyncStorage.setItem('@portfolio_coins',jsonValue)
    setAssetsInStorage(newAssets)
    navigation.goBack()
  };

  const isQuantityEntered = () => quantity != "";

  return (
    <View style={{ flex: 1 }}>
      <SearchableDropdown
        items={allCoins}
        onItemSelect={(item: any) => setSelectedCoinId(item.id)}
        containerStyle={styles.dropdownContainer}
        itemStyle={styles.item}
        itemTextStyle={{ color: "white" }}
        resetValue={false}
        placeholder={selectedCoinId || "Select a coin..."}
        placeholderTextColor="white"
        textInputProps={{
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1.5,
            borderColor: "#444444",
            borderRadius: 5,
            backgroundColor: "#1e1e1e",
            color: "white",
          },
        }}
      />
       {selectedCoin && (
        <>
      <View style={styles.boughtQuantityContainer}>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            placeholder="0"
            style={{
              backgroundColor: "#121212",
              color: "#fff",
              fontSize: 50,
              borderWidth: 0,
            }}
            activeUnderlineColor="transparent"
          />
          <Text style={styles.ticker}>{selectedCoin?.symbol?.toUpperCase()}</Text>
        </View>
        <Text style={styles.pricePerCoin}>
          ${selectedCoin?.market_data.current_price?.usd} per coin
        </Text>
      </View>
      <Pressable
        disabled={!isQuantityEntered()}
        style={[
          styles.buttonContainer,
          { backgroundColor: !isQuantityEntered() ? "#303030" : "#4169E1" },
        ]}
        onPress={onAddNewAsset}
      >
        <Text
          style={[
            styles.buttonText,
            { color: !isQuantityEntered() ? "grey" : "white" },
          ]}
        >
          Add New Asset
        </Text>
      </Pressable>
      </>

      )}
    </View>
  );
};

export default AddNewAssetScreen;
