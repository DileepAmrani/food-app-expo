import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import firebase from "../../Config/Firebase/firebase";
import { ProductCard } from "./../../Components";
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  useState(() => {
    let meals = [];
    firebase
      .firestore()
      .collection("mealkits")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((data) => {
          let product = data.doc.data();
          product.id = data.doc.id;
          meals.push(product)
          setMeals(meals);
          console.log(meals);
        });
      });
  }, []);
  return (
    <View style={styles._container}>
      {/* <ScrollView>
        {loading ? (
          <View style={styles._loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          meals.map((v, i)=>{
          return <ProductCard />
          })
        )}
      </ScrollView> */}
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
