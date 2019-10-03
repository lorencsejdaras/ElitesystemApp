import React,{Component} from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Tab,
  Tabs
} from 'native-base';

import MyFooter from '../Footer';
import PayedPurchases from '../PayedPurchases';
import UnpayedPurchases from '../UnpayedPurchases';

export default class Purchases extends Component {

  render() {

    return (
      <Container>

        <Content>
            <Tabs>
              <Tab heading="Te Paguara">
                <PayedPurchases/>
              </Tab>
              <Tab heading="Te Mbartura">
                <UnpayedPurchases/>
              </Tab>
            </Tabs>
        </Content>

        <MyFooter navigation={this.props.navigation}/>

      </Container>
    )
  }

}

AppRegistry.registerComponent('Purchases', () => Purchases);
