import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import firebase from "../../Config/Firebase/firebase";

export default function Loader(props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // setVisible(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        props.navigation.navigate("Home");
        setVisible(false);
      } else {
        // No user is signed in.
        props.navigation.navigate("Login");
        setVisible(false);
      }
    });
  });

  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      source={require("./Loader.json")}
      animationStyle={styles.lottie}
      speed={1}
    />
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
