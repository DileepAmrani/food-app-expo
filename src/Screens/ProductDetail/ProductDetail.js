import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import { CustomButton } from "../../Components";
const MaxWidth = Dimensions.get("window").width;

export default function ProductDetail(props) {
  const data = props.route.params;
  return (
    <View style={styles._container}>
      <ScrollView>
        <View style={styles._card}>
          <View style={styles._title_view}>
            <Text style={styles._title}>{data.name}</Text>
          </View>

          <Image
            source={require("./../../../assets/product.jpg")}
            style={styles._product_image}
          />
          <View style={styles._price_view}>
            <View>
              <Text style={styles._price}>RS: {data.price}$</Text>
            </View>
            <View>
              <Text style={styles._price}>Colories: {data.calorie}</Text>
            </View>
          </View>

          <View style={styles._description_view}>
            <Text style={styles._description}>{data.description}</Text>
          </View>

          <View style={styles._btn_view}>
            <CustomButton
              name="Place Order"
              onPress={() => props.navigation.navigate("Order Detail", data)}
            />
          </View>
        </View>
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
  },
  _loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  _title_view: {
    padding: 10,
  },
  _title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7c7cf7",
    textAlign: "center",
  },
  _product_image: {
    height: 200,
    width: MaxWidth - 50,
    alignSelf: "center",
  },
  _price_view: {
    padding: 20,
    display: "flex",
  },
  _price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#727372",
    flex: 1,
  },
  _description_view: {
    paddingHorizontal: 20,
  },
  _description: {
    fontSize: 17,
    color: "#7c7cf7",
    fontWeight: "700",
  },
  _btn_view: {
    marginTop: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
});
