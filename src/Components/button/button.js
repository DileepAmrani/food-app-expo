import React, { Component } from "react";
import { Button, Text  } from "native-base";
import { StyleSheet, Dimensions} from "react-native";
const MaxWidth = Dimensions.get("window").width;

class ButtonRoundedExample extends Component {
  render() {
    return (
      <Button onPress={this.props.onPress} style={Styles._btn} bordered light>
        <Text style={Styles.txt}>{this.props.name}</Text>
      </Button>
    );
  }
}

export default ButtonRoundedExample;

const Styles = StyleSheet.create({
  _btn: {
   width: MaxWidth - 50,
    justifyContent: "center",
    backgroundColor: "#600EE6",
    borderRadius: 5,
    marginBottom: 5
  },
  txt: {
    width: "100%",
    textAlign: "center",
    color: "#fff"
  },
});
