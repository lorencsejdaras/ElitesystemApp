import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';

// global api url 
global.url = "https://gym.elitestudio.io";

export default class  MyFooter extends Component {

  constructor(props) {
    super(props);
  }

  checkRouteName = (route) => {
    if(this.props.navigation.state.routeName == route ) {
      return true;
    }
    return false;
  }

  navigate = (route) => {
    this.props.navigation.navigate(route);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active={this.checkRouteName('Home')} onPress={() => this.navigate('Home')}>
            <Icon active={this.checkRouteName('Home')} name="home" />
          </Button>
          <Button active={this.checkRouteName('Chat')} onPress={() => this.navigate('Chat')}>
            <Icon active={this.checkRouteName('Chat')} name="chatboxes"/>
          </Button>
          <Button active={this.checkRouteName('Todo')} onPress={() => this.navigate('Todo')}>
            <Icon active={this.checkRouteName('Todo')} name="bookmarks" />
          </Button>
          <Button active={this.checkRouteName('Purchases')} onPress={() => this.navigate('Purchases')}>
            <Icon active={this.checkRouteName('Purchases')} name="cart" />
          </Button>
          <Button>
            <Icon name="pie" />
          </Button>
          <Button active={this.checkRouteName('Settings')} onPress={() => this.navigate('Settings')}>
            <Icon active={this.checkRouteName('Settings')} name="settings" />
          </Button>
        </FooterTab>
      </Footer>
    );
  }

}
