import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { CustomInput, CustomButton } from "../../Components";
import { FontAwesome5 } from "@expo/vector-icons";
import firebase from "../../Config/Firebase/firebase";
import * as Facebook from "expo-facebook";

import { Ionicons, Feather, SimpleLineIcons } from "react-native-vector-icons";

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check_email, setCheck_email] = useState(false);

  const EmailInputChange = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isVlaid = re.test(String(email).toLowerCase());
    if (isVlaid) {
      setEmail(val);
      setCheck_email(true);
    } else {
      setEmail(val);
      setCheck_email(false);
    }
  };

  const loginFunc = () => {
    if (!email || !password) {
      Alert.alert("Fill Data Correctly");
    } else {
      setLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
          setLoading(false);
          setPassword("");
          setEmail("");
          let userUid = firebaseUser.user.uid;
          AsyncStorage.setItem("token", JSON.stringify(userUid)).then(() => {
            props.navigation.navigate("Home");
          });
        }).catch((error)=>{
          setLoading(false);
          Alert.alert(error.message)
        });
    }
  };

  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync("620636322191373");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "620636322191373",
        {
          Permissions: ["public_profile"],
        }
      );
      if (type === "success" && token) {
        let user;
        var credential = await firebase.auth.FacebookAuthProvider.credential(
          token
        );
        await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .then((result) => {
            user = {
              name: result.user.displayName,
              photoURL: result.user.photoURL,
              uid: result.user.uid,
            };
            console.log("User Detail ==>", result.user.uid);

            let userUid = result.user.uid;
            AsyncStorage.setItem("token", JSON.stringify(userUid)).then(() => {
              props.navigation.navigate("Home");
            });
          })
          .catch((err) => {
            console.log("Error==>", err);
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  };

  const signup = () => {
    props.navigation.navigate("Signup");
  };

  return (
    <View style={styles._container}>
      <View style={styles._logo_box}>
        <Image
          source={require("./../../../assets/logo.png")}
          style={styles._logo}
        />
      </View>

      <View style={styles._form}>
        <View
          style={[
            styles.action,
            check_email
              ? { borderColor: "#635DB7" }
              : { borderColor: "rgb(238,238,238)" },
          ]}
        >
          <Feather
            name="mail"
            color={check_email ? "#635DB7" : "rgb(138,141,144)"}
            size={18}
          />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => EmailInputChange(val)}
          />
          <Ionicons
            name="ios-checkmark-circle"
            color={check_email ? "#635DB7" : "rgb(138,141,144)"}
            size={20}
          />
        </View>
        {/* password */}
        <View style={styles.action}>
          <SimpleLineIcons name="lock" color="rgb(138,141,144)" size={20} />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(v) => setPassword(v)}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>

      <View style={styles._footer}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text>Don't have Account? </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={signup}>
            <Text style={{ color: "#600EE6", fontWeight: "bold" }}>
              Signup.
            </Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          onPress={loginFunc}
          name={loading ? "Loading..." : "Login"}
        />
        <CustomButton
          onPress={loginWithFacebook}
          name={"Login With Facebook"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  _logo: {
    height: 150,
    width: 200,
  },
  _logo_box: {
    alignSelf: "center",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "rgb(238,238,238)",
    padding: 8,
    alignItems: "center",
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  _form: {
    padding: 15,
  },
  _footer: {
    alignSelf: "center",
  },
});
