import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  Image,
  Alert,
} from "react-native";
import firebase from "../../Config/Firebase/firebase";

export default function Recents(props) {
  const [loading, setLoading] = useState(false);
  const [allorders, setallorders] = useState([]);

  useState(async () => {
    let allorders = [""];
    const unsubscribe = props.navigation.addListener("focus", async () => {
      const data = props.route.params;
      let uid = await AsyncStorage.getItem("token");
      console.log(uid);
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
              console.log(allorders);
              setallorders(allorders);
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <View style={styles._container}>
      <ScrollView>
        {loading ? (
          <View style={styles._loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles._box}>
            {allorders ? (
              <View>
                <View style={styles._header}>
                  <Text style={styles._title}> Recent Orders</Text>
                </View>
                {allorders.map((v, i) => {
                  return (
                    <View style={styles._card} key={i}>
                      <View style={{ flex: 1 }}>
                        <Image
                          source={{ uri: v.photo }}
                          style={styles._thumbnail}
                        />
                      </View>
                      <View style={{ flex: 2, alignSelf: "flex-start" }}>
                        <Text style={styles._text}>Name: {v.name}</Text>
                        <Text style={styles._text}>Price: {v.price}$</Text>
                        <Text style={styles._text}>Calorie: {v.calorie}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text>No Recent Order Available</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  _container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  _loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  _header: {
    alignSelf: "center",
    padding: 20,
  },
  _title: {
    fontSize: 20,
    fontWeight: "700",
  },
  _card: {
    borderWidth: 1,
    flexDirection: "row",
    borderRadius: 5,
    elevation: 5,
    borderColor: "#ebebf2",
    backgroundColor: "#ebebf2",
    marginBottom: 10,
  },
  _thumbnail: {
    width: 70,
    height: 70,
    margin: 2,
    borderRadius: 5,
  },
  _text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#676770",
  },
});
