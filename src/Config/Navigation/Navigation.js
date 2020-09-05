import * as React from "react";
import {
  View,
  Button,
  AsyncStorage,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  Loader,
  LoginScreen,
  SignupScreen,
  MealKitsScreen,
  OrderTrackingScreen,
  RecentsScreen,
  ProductDetail,
  OrderDetail,
  PhoneAuth,
} from "./../../Screens/index";
import firebase from "../../Config/Firebase/firebase";

import { SideDrawer, Header } from "./../../Components";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Meals"
        component={MealKitsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 30,
                  height: 30,
                  paddingBottom: 3,
                }}
              >
                <MaterialCommunityIcons name="food" size={30} color="#5055e6" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Recents"
        component={RecentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 30,
                  height: 30,
                  paddingBottom: 3,
                }}
              >
                <FontAwesome name="history" size={30} color="#5055e6" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  width: 30,
                  height: 30,
                  paddingBottom: 3,
                }}
              >
                <MaterialCommunityIcons
                  name="find-replace"
                  size={35}
                  color="#5055e6"
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function MainNavigation() {

  const Signout =()=>{
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          AsyncStorage.removeItem("token")
          console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loader"
          component={Loader}
          options={{
            headerShown: null,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: null }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: null }}
        />

        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{
            headerTitle: null,
            headerLeft: null,
            headerRight: () => (
              <View style={{padding: 4}}>
                <Button
                  onPress={() => Signout()}
                  title="LOG OUT"                
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Phone"
          component={PhoneAuth}
          options={{ headerShown: null }}
        />
        <Stack.Screen name="Product Detail" component={ProductDetail} />
        <Stack.Screen name="Order Detail" component={OrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
