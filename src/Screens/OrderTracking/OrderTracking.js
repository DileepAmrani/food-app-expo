// import React, {useState} from "react";
// import { StyleSheet, View } from "react-native";
// import { Spinner } from "native-base";
// import MapView, {Marker} from "react-native-maps";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";

// // export default function MapScreen(){
// //   const []
// // }

// export default class Map extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       location: false,
//       markers:
//         {
//           latitude: 24.7340774,
//           longitude: 69.7973839
//         },
//     };
//   }

//   async componentDidMount() {
//     let { status } = await Permissions.askAsync(Permissions.LOCATION);
//     if (status !== "granted") {
//       this.setState({
//         errorMessage: "Permission to access location was denied",
//       });
//     }

//     let location = await Location.getCurrentPositionAsync({});
//     this.setState({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//       location: true,
//     });
//   }

//   setMargin = () => {
//     this.setState({ mapMargin: 0 });
//   };

//   //press event to add marker
//   _handleLongPress = (e) => {
//     this.setState({
//       markers: [
//         ...this.state.markers,
//         {
//           coordinates: {
//             longitude: e.nativeEvent.coordinate.longitude,
//             latitude: e.nativeEvent.coordinate.latitude,
//           },
//         },
//       ],
//     });

//     this.props.getLocation(e.nativeEvent.coordinate);
//   };

//   render() {
//     let { latitude, longitude } = this.state;
//     console.log(latitude);
//     return (
//       <View style={styles.container}>
//         {this.state.location ? (
//           <MapView
//             showsMyLocationButton={true}
//             showsCompass={true}
//             zoomControlEnabled
//             showsUserLocation={true}
//             onMapReady={this.setMargin}
//             style={{ ...styles.mapStyle, marginBottom: this.state.mapMargin }}
//             initialRegion={{
//               latitude,
//               longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             //   add marker when user presses and hold map
//             onLongPress={(e) => this._handleLongPress(e)}
//           >
//               <MapView.Marker
//                 ref={this.setMarkerRef}
//                 draggable
//                 coordinate={this.state.markers}
//               ></MapView.Marker>
//           </MapView>
//         ) : (
//           <View
//             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//           >
//             <Spinner color="red" size={50} />
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     height: 350
//   },
//   mapStyle: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";

// Required libraries:
// * Geolocation: expo-location
// * Mapping: react-native-maps
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

//to get the distance bewteen two location used geolib libraray
import { getDistance } from "geolib";
import geolib from "geolib";

let interval;

// Import tourism data from poi.json file
export default function OrderTracking() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 24.738602,
    lng: 69.7981388,
  });
  //  const [userLocation, setUserLocation] = useState({"lat":43.7277125, "lng":-79.7992378});
  const [userLocation, setUserLocation] = useState({
    lat: 24.738602,
    lng: 69.7981388,
  });

  //43.7538726,-79.7434249
  //to get exact reverse geo location is used to convert into humanredable name.
  const [address, setAddress] = useState({ city: "", state: "" });

  const [alertShown, setAlertShown] = useState(false);

  const [counter, setCounter] = useState(0);

  // const [toClearTimer, setClearTimerValue] = useState();

  //without using button when app loads to show loaction call the methods in use Effect hooks in function
  // instead of cliking button to get location now when app loads we will get location

  // useEffect(() => {
  //   getLocation();
  // }, []);

  // useEffect(() => {
  // }, [userLocation]);

  useEffect(() => {
    getLocation();
    if (counter == 10) {
      clearInterval(interval);
      alert("your order is ready to pick");
    }
  }, [counter]);

  const getLocation = async () => {
    // 1. Ask for permission
    let { status } = await Location.requestPermissionsAsync();

    if (status === "granted") {
      // go and get the device' location
      let location = await Location.getCurrentPositionAsync({});
      console.log(JSON.stringify(location));

      // DEBUG: outputting the lat, lng, and time
      console.log(
        `Time: ${location.timestamp}: ${location.coords.latitude}, ${location.coords.longitude}`
      );
      // update the state variable
      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      checkDistance();
    } else {
      // error mesasge
      console.log("Permission to access location was denied");
    }
  };

  //calculate distance b/w two locations

  const dist = getDistance(
    { latitude: currentLocation.lat, longitude: currentLocation.lng },
    { latitude: userLocation.lat, longitude: userLocation.lng }
  );

  const checkDistance = () => {
    console.log("check distance");
    console.log("location is" + currentLocation.lat + currentLocation.lng);
    console.log("User location is" + userLocation.lat + userLocation.lng);
    let checkDistanceValue = dist;
    console.log("distance b/w tow locations: " + checkDistanceValue);
    if (checkDistanceValue > 400) {
      if (alertShown === false) {
        alert(`you are ${checkDistanceValue} from you Resturant`);
        // startTimer();
        setAlertShown(true);
      }
    }
  };

  const startTimer = () => {
    // interval = setInterval(() => {
    //   setCounter((counter) => counter + 1);
    //   console.log("============> Time", counter);
    // }, 1000);
    console.log("w");
  };

  // 2. create a click handler for monitoring location changes
  // const locationChangedCallback = (location) => {
  //   // DEBUG: outputting the lat, lng, and time
  //   console.log(
  //     `Location changed. Time: ${location.timestamp}: ${userLocation.lat}, ${userLocation.lng}`
  //   );

  //   // update the state variable
  //   setUserLocation({ lat: userLocation.lat, lng: userLocation.lng });
  // };

  // const subscribeToLocationChanges = async () => {
  //   // 1. Ask for permission
  //   let { status } = await Location.requestPermissionsAsync();

  //   if (status === "granted") {
  //     // go and get the device' location
  //     let location = await Location.watchPositionAsync(
  //       { timeInterval: 9000 },
  //       locationChangedCallback
  //     );
  //     console.log(JSON.stringify(location));
  //   } else {
  //     // error mesasge
  //     console.log("Permission to access location was denied");
  //   }
  // };

  // console.log("time is" + counter);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
          }}
          title="TrinityMall"
          description="A mall for everything"
        ></Marker>
        <Marker
          coordinate={{
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          }}
          draggable
          title="User location"
          description="User place"
          pinColor="blue"
        ></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    // height: 350,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
