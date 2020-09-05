import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from "native-base";
import { Alert, TouchableOpacity } from "react-native";
export default class HeaderIconExample extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.ToggleDrawer}>
              <Button transparent >
                <Icon name="menu" />
              </Button>
            </TouchableOpacity>
          </Right>
        </Header>
      </Container>
    );
  }
}
