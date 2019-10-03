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
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Badge,
  Spinner,
} from 'native-base';

export default class PayedPurchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchases: [],
      loading: true
    }
  }

  async componentDidMount() {
    try {
      // get purchases
      await this.getPurchases();
      this.setState({ loading: false });
    } catch (err) {
      console.log('ERROR FETCHING DATA -------------', err);
    }
  }

  async getPurchases() {
    const purchasesCall = await fetch(global.url+'/api/unpayedPurchases');
    const purchasesResponse = await purchasesCall.json();
    this.setState({ purchases: purchasesResponse["data"] });
  }

  render() {
    if(this.state.loading == true) {
      return (
        <Spinner color="blue"></Spinner>
      )
    }
    return (
      <Container>
        <Content>
          {
          this.state.purchases.map((item,i) => (
            <List key={i}>
              <ListItem avatar>
                <Left>
                  <Thumbnail style={{ height: 40, width: 40 }} source={{ uri: global.url + item.photo }} />
                </Left>
                  <Body>
                    <Text>{item.buyer}</Text>
                    <Text note>{item.product} x {item.quantity}</Text>
                  </Body>
                  <Right>
                    <Text note>{item.price} (Lek)</Text>
                    <Text note>{item.time}</Text>
                  </Right>
              </ListItem>
            </List>
          ))
          }
          </Content>
        </Container>
      )
  }
}
