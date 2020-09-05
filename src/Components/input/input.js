import React, { Component } from "react";
import { StyleSheet, Dimensions, TextInput } from "react-native";
import { View } from "native-base";

const MaxWidth = Dimensions.get("window").width;

export default class InlineLabelExample extends Component {
  render() {
    return (
      <View style={{ marginTop: 20 }}>
        <TextInput
          style={Styles.input}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          placeholderTextColor="#223345"
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  input: {
    width: MaxWidth - 50,
    color: "#223345",
    // height: 40,
    borderWidth: 1,
    borderColor: "#c4bcbc",
    fontWeight: "300",
    padding: 10,
    borderRadius: 5,
  },
});
