import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const MaxWidth = Dimensions.get("window").width;
export default function CardItem(props) {
  return (
    <View style={styles._card} >
      <TouchableOpacity onPress={props.onPressBtn}>
        <View style={styles._title_view}>
          <Text style={styles._title}>{props.name}</Text>
        </View>

        <Image source={{ uri: props.photo }} style={styles._product_image} />
        <View style={styles._price_view}>
          <Text style={styles._price}>RS: {props.price}$</Text>
          <Text style={styles._price}>Colories: {props.calorie}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  _card: {
    width: MaxWidth - 10,
    elevation: 2,
    backgroundColor: "#ebebf7",
    alignSelf: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  _title_view: {
    padding: 10,
  },
  _title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#7c7cf7",
  },
  _product_image: {
    height: 200,
    width: MaxWidth - 10,
  },
  _price_view: {
    padding: 10,
  },
  _price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#727372",
  },
});
