import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Content,
  List,
  ListItem,
  Button,
  Left,
  Body,
  Right,
  Icon,
  Text,
  Switch
} from 'native-base';
import MyFooter from '../Footer.js';

export default class Settings extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    // fshi variablat
    AsyncStorage.removeItem('@elitesystem:email');
    AsyncStorage.removeItem('@elitesystem:password');
    // redirekto
    this.props.navigation.navigate('Login');
  }

  render() {
    return(
      <Container>
        <Content style={{margin:0}}>
          <ListItem icon>
            <Left>
              <Button rounded style={{ backgroundColor: "#5867dd" }}>
                <Icon active name="paper" />
              </Button>
            </Left>
            <Body>
              <Text>Njoftimet</Text>
            </Body>
            <Right>
              <Switch />
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button rounded style={{ backgroundColor: '#ea3679' }}>
                <Icon active name="person"/>
              </Button>
            </Left>
            <Body>
              <Text onPress={this.logout}>Logout</Text>
            </Body>
          </ListItem>
        </Content>
        <MyFooter navigation={this.props.navigation}/>
      </Container>
    );
  }

}

AppRegistry.registerComponent('Settings', () => Settings);
