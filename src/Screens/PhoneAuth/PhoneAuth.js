import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Alert, Image } from "react-native";
import { CustomInput, CustomButton } from "../../Components";
import firebase from "../../Config/Firebase/firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import {
  Ionicons,
  Feather,
  SimpleLineIcons,
  FontAwesome,
} from "react-native-vector-icons";

export default function Phone(props) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [check_email, setCheck_email] = useState(false);
  const [profile, setProfile] = useState();
  const [profileUrl, setProfileUrl] = useState("https://firebasestorage.googleapis.com/v0/b/meal-backend.appspot.com/o/Profile%2F0.6401411780467283?alt=media&token=337e3791-73a0-4ee8-86b8-0e5a3edc6f3d");
  const getPermissionAsync = async () => {
    // if (Constants.platform.ios) {
    //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //   if (status !== "granted") {
    //     alert("Sorry, we need camera roll permissions to make this work!");
    //   }
    // }

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        // props.navigation.navigate("Home");
      } else {
        // No user is signed in.
        // props.navigation.navigate("");
      }
    });
    // getPermissionAsync();
  });

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

  const imageFromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfile(result.uri);
        let uri = result.uri;
        var name = Math.random();
        var ref = await firebase.storage().ref("/").child(`Profile/${name}`);
        const response = await fetch(uri);
        const blob = await response.blob(uri);
        let metadata = {
          contentType: "image/jpeg",
        };
        await ref.put(blob, metadata);
        ref
          .getDownloadURL()
          .then((url) => {
            console.log("------=======url===--->",url);
            setProfileUrl(url)
            // this.setState({ image: url });
          })
          .catch((err) => {
            console.log(err.message);
          });
        // console.log(this.state.imageURL);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const imageFromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setProfile(result.uri);
        let uri = result.uri;
        var name = Math.random();
        var ref = await firebase.storage().ref("/").child(`Profile/${name}`);
        const response = await fetch(uri);
        const blob = await response.blob(uri);
        let metadata = {
          contentType: "image/jpeg",
        };
        await ref.put(blob, metadata);
        ref
          .getDownloadURL()
          .then((url) => {
            console.log("------=======url===--->",url);
            setProfileUrl(url)
            // this.setState({ image: url });
          })
          .catch((err) => {
            console.log(err.message);
          });
        // console.log(this.state.imageURL);
      }

    } catch (E) {
      console.log(E);
    }
  };

  const signupFunc = () => {
    
    if (!name || !email || !password || !profile) {
      Alert.alert("fill the form");
    } else {
      if (profileUrl === "") {
        alert("please wait while uploaded image");
      } else {
        let userObj = { name, email, password, phone, url };
        setLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((firebaseUser) => {
            let userUid = firebaseUser.user.uid;
            firebase
              .firestore()
              .collection("users")
              .doc(userUid)
              .set(userObj)
              .then(() => {
                alert("user register succesfully");
                props.navigation.navigate("Home");
                setLoading(false);
                setPassword("");
                setEmail("");
              })
              .catch((err) => {
                alert(err.message);
              });
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    }
  };

  const signupWithGoogleFunc = () => {
    Alert.alert("");
  };

  const login = () => {
    props.navigation.navigate("Login");
  };

  return (
    <View style={styles._container}>
      <View style={styles._logo_box}>
        <Image
          source={require("./../../../assets/logo.png")}
          style={styles._logo}
        />
      </View>

      <View style={styles._profile_box}>
        {profile && profile ? (
          <Image source={{ uri: profile }} style={styles._profile} />
        ) : (
          <Image
            source={require("./../../../assets/profile.jpeg")}
            style={styles._profile}
          />
        )}

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* <View style={{ flex: 1 }}> */}
          <TouchableOpacity onPress={imageFromGallery}>
            <FontAwesome name="image" color="#600EE6" size={20} />
          </TouchableOpacity>
          {/* </View> */}
          {/* <View style={{ flex: 1 }}> */}
          <TouchableOpacity onPress={imageFromCamera}>
            <FontAwesome name="camera" color="#600EE6" size={20} />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles._form}>
          <View style={styles.action}>
            <Feather name="user" color="rgb(138,141,144)" size={20} />
            <TextInput
              placeholder="User Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(v) => setName(v)}
              value={name}
            />
          </View>

          {/* email */}

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

          {/* Phone */}
          <View style={styles.action}>
            <Feather name="phone" color="rgb(138,141,144)" size={20} />
            <TextInput
              placeholder="Phone Number"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(v) => setPhone(v)}
              value={phone}
              keyboardType="phone-pad"
            />
            {/* <Feather name="check-circle" color="white" size={20} /> */}
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
      </View>
      <View style={styles._footer}>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text>Already have Account? </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={login}>
            <Text style={{ color: "#600EE6", fontWeight: "bold" }}>Login.</Text>
          </TouchableOpacity>
        </View>

        <CustomButton
          onPress={signupFunc}
          name={loading ? "Loading..." : "Signup"}
        />

        <CustomButton
          onPress={getPermissionAsync}
          name={
            loading
              ? "Loading..."
              : // <FontAwesome5 name="facebook-f" size={24} color="white" />
                "Signup With Google"
          }
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
  _logo_box: {
    alignSelf: "center",
  },
  _logo: {
    height: 150,
    width: 200,
  },
  _profile_box: {
    alignSelf: "center",
  },
  _profile: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#000",
  },
  _header: {
    marginVertical: 0,
  },
  _header_title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#600EE6",
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
