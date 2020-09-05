import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  YellowBox,
} from "react-native";
import firebase from "../../Config/Firebase/firebase";
import { ProductCard } from "../../Components";
export default function MealKits(props) {
  YellowBox.ignoreWarnings(["Setting a timer"]);

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  useState(async () => {
    let mealsData = [];
    await firebase
      .firestore()
      .collection("mealkits")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((data) => {
          let product = data.doc.data();
          product.id = data.doc.id;
          mealsData.push(product);
          console.log(mealsData);
        });
        setMeals(mealsData);
      });
  }, []);

  const productDetail = (v) => {
    props.navigation.navigate("Product Detail", v);
  };
  return (
    <View style={styles._container}>
      <ScrollView>
        {loading ? (
          <View style={styles._loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          meals.map((v, i) => {
            return (
              <ProductCard
                key={i}
                onPressBtn={() => productDetail(v)}
                name={v.name}
                price={v.price}
                calorie={v.calorie}
                photo={v.photo}
                description={v.description}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 60
  },
  _loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
