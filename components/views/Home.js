import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';

import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon,
  Badge,
  Spinner
} from 'native-base';

import MyFooter from '../Footer';

// GLOBALS
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activity: [],
      loading: true
    };
  }

  async componentDidMount() {

    try {
      // merr aktivitetin
      await this.getActivity();
      this.setState({loading: false});
    } catch(err) {
      console.log('Error fetching data----------', err);
    }

  }

  async getActivity() {
    const activityCall = await fetch(global.url+'/api/activity');
    const activityResponse = await activityCall.json();
    this.setState({ activity: activityResponse["data"] });
  }

  returnNoActivity = () => {
    return (
      <Content>
        <Image style={styles.sleep} source={require('../../assets/sleep.png')}/>
        <Text style={styles.noActivity}>Per momentin nuk ka aktivitet</Text>  
      </Content>
    );
  }

  returnActivity = (item,i) => {
    return(
      <List key={i}>
        <ListItem avatar>
          <Left>
            <Thumbnail style={{ height: 40, width: 40 }} source={{ uri: global.url + item.photo }} />
          </Left>
            <Body>
              <Text>{item.fullname}</Text>
              <Text note>{item.email}</Text>
            </Body>
            <Right>
              <Text note></Text>
              <Text note>{item.updated_at}</Text>
            </Right>
        </ListItem>
      </List>
    );
  }

  render() {
    if(this.state.loading == true) {
      return (
        <Spinner color="blue"></Spinner>
      )
    }
    return (
      <Container style={{ backgroundColor: '#f5f5f5' }}>
        
        <Content>

          <ListItem itemDivider style={{backgroundColor: '#eee'}}>
            <Text>Aktiviteti</Text>
            <Icon name="pulse" style={{marginLeft: 5}}></Icon>
            <Badge primary style={{marginLeft: width * 0.45}}>
              <Text style={{marginTop: 1}}>Total: {this.state.activity.length}</Text>
            </Badge>
          </ListItem>

          {this.state.activity.length == 0 ? this.returnNoActivity() : null}  
          {this.state.activity.map((item,i) => (this.returnActivity(item,i) ))}

        </Content>

        <MyFooter navigation={this.props.navigation}/>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  noActivity: {
    textAlign: 'center',
    fontSize: 20,
  },
  sleep: {
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: width/2,
    resizeMode: "contain"
  }
 });

AppRegistry.registerComponent('Home', () => Home);
