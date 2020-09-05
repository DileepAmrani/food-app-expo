import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import { CustomButton } from "../../Components";
import firebase from "../../Config/Firebase/firebase";

const MaxWidth = Dimensions.get("window").width;

export default function ProductDetail(props) {
  const [tip, setTip] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [showOtherTip, setShowOtherTip] = useState(false);
  const [allorders, setallorders] = useState([]);
  const data = props.route.params;
  const taxAmount = (data.price / 100) * 13;
  const totalAmount = data.price + taxAmount + tipAmount;
  // useEffect(()=>{
  //    data = props.route.params;

  // })

  const Addtip = (amount) => {
    let tip = amount;
    const tipAmount = (data.price / 100) * tip;
    setTip(tip);
    setTipAmount(tipAmount);
  };

  useState(async () => {
    let allorders = [];
    const data = props.route.params;
    let uid = await AsyncStorage.getItem("token");
    if (uid) {
      uid = JSON.parse(uid);
    }
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let user = doc.data();
          console.log(user);
          if (user.allrecent) {
            allorders = user.allrecent;
            setallorders(allorders);
            console.log("Recent Order ===============>", allorders);
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }, []);

  let Make_Payment = async () => {
    const data = props.route.params;
    let uid = await AsyncStorage.getItem("token");
    if (uid) {
      uid = JSON.parse(uid);
    }
    allorders.push(data);
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        allrecent: allorders,
      })
      .then(() => {
        Alert.alert("Data Added");
        props.navigation.navigate("Home");
      });
  };

  return (
    <View style={styles._container}>
      <ScrollView>
        <View style={styles._title_view}>
          <Text style={styles._title}>Order Detail</Text>
        </View>

        <View style={styles._data_view}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 4,
            }}
          >
            <View>
              <Text style={styles._data}>Add TIP Here</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => Addtip(10)}>
                <Text>10%</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => Addtip(15)}>
                <Text>15%</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => Addtip(20)}>
                <Text>20%</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => setShowOtherTip(true)}>
                <Text>Other</Text>
              </TouchableOpacity>
            </View>
          </View>

          {showOtherTip ? (
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles._data}>Other : </Text>
              </View>
              <View>
                <TextInput
                  placeholder="other tip"
                  style={{ borderWidth: 1, minWidth: 100 }}
                  keyboardType="number-pad"
                  onChangeText={(e) => Addtip(e)}
                />
              </View>
            </View>
          ) : (
            <View></View>
          )}
          <View style={styles._row}>
            <Text style={styles._data}>Name of Meal Kit : {data.name}</Text>
          </View>
          <View style={styles._row}>
            <Text style={styles._data}>Item Code : Not Available</Text>
          </View>
          <View style={styles._row}>
            <Text style={styles._data}>Sub Total : {data.price}$</Text>
          </View>
          <View style={styles._row}>
            <Text style={styles._data}>Tax: 13%</Text>
          </View>
          <View style={styles._row}>
            <Text style={styles._data}>Tip Amount: {tip}%</Text>
          </View>
          <Text style={styles._data}>
            Total Amount to be paid: {totalAmount}$
          </Text>
        </View>
        <View style={styles._btn_view}>
          <CustomButton name="Make Payment" onPress={() => Make_Payment()} />
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
  _row: {
    paddingVertical: 4,
  },
  _data: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },

  _btn_view: {
    marginTop: 40,
    justifyContent: "center",
    alignSelf: "center",
  },
});
