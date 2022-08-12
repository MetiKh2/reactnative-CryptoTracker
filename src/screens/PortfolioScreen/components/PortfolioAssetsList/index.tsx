import React from "react";
import { FlatList, View, Text, Pressable } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import PortfolioAssetItem from "../PortfolioAssetItem";
import { useRecoilState } from "recoil";
import {
  allPortfolioAssets,
  allPortfolioBoughtAssetsInStorage,
} from "../../../../atoms/ProfileAsset";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const [assets] = useRecoilState(allPortfolioAssets);
  const [storageAssets, setStorageAssets] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const getCurrentBalance = () => {
    return assets?.reduce(
      (total, current) => total + current.currentPrice * current.quantityBought,
      0
    );
  };
  const getCurrentValueChange = () => {
    const currentBalance = getCurrentBalance();
    const bought = assets?.reduce(
      (total, current) => total + current.priceBought * current.quantityBought,
      0
    );
    return (currentBalance - bought).toFixed(2);
  };
  const getCurrentPercentageChange = () => {
    const currentBalance = getCurrentBalance();
    const boughtBalance = assets.reduce(
      (total, currentAsset) =>
        total + currentAsset.priceBought * currentAsset.quantityBought,
      0
    );
    return (
      (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
    );
  };
  const onDeleteAsset = async (asset) => {
    const newAssets = storageAssets.filter(
      (coin) => coin.unique_id !== asset.item.unique_id
    );
    const jsonValue = JSON.stringify(newAssets);
    await AsyncStorage.setItem("@portfolio_coins", jsonValue);
    setStorageAssets(newAssets);
  };

  const renderDeleteButton = (data) => {
    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "#EA3943",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingRight: 30,
          marginLeft: 20,
        }}
        onPress={() => onDeleteAsset(data)}
      >
        <FontAwesome name="trash-o" size={24} color="white" />
      </Pressable>
    );
  };
  const isChangePositive = () => getCurrentValueChange() >= 0;
  return (
    <View>
      <SwipeListView
        disableRightSwipe
        keyExtractor={({ id }, index) => `${id}${index}`}
        data={assets}
        renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
        rightOpenValue={-75}
        renderHiddenItem={(data, rowMap) => renderDeleteButton(data)}
        ListFooterComponent={
          <Pressable
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("AddNewAsset")}
          >
            <Text style={styles.buttonText}>Add New Asset</Text>
          </Pressable>
        }
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>
                  ${getCurrentBalance()?.toFixed(2)}
                </Text>
                <Text
                  style={{
                    ...styles.valueChange,
                    color: isChangePositive() ? "green" : "red",
                  }}
                >
                  ${getCurrentValueChange()} (All Time)
                </Text>
              </View>
              <View
                style={{
                  ...styles.priceChangePercentageContainer,
                  backgroundColor: isChangePositive() ? "green" : "red",
                }}
              >
                <AntDesign
                  name={isChangePositive() > 0 ? "caretup" : "caretdown"}
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>
                  {getCurrentPercentageChange()=='NaN'?'0':getCurrentPercentageChange()}%
                </Text>
              </View>
            </View>
            <Text style={styles.assetsLabel}>Your Assets</Text>
          </>
        }
      />
    </View>
  );
};

export default PortfolioAssetsList;
