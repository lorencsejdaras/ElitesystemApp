import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  View,
  FlatList,
  AsyncStorage
} from 'react-native';

import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Spinner
} from 'native-base';

import MyFooter from '../Footer';

export default class Chat extends Component {
    constructor(props) {
      super(props);

      this.messageInput = React.createRef();
      
      this.state  = {
        isMounted: true,
        id: null,
        messages: [],
        loading: true
      };
    }

    componentDidMount = async () => {
      this.state.loading = false;
      // merr id te login user
      const id = await AsyncStorage.getItem('@elitesystem:id');
      this.setState({ id: id });
      // merr mesazhet
      await this.getMessages();
      // merr mesazhet cdo 10 sekonda
      if(this.state.isMounted) { this.interval = await setInterval(() => this.getMessages(), 10000); }
    }

    componentWillUnmount = () => {
      this.state.isMounted = false;
      clearInterval(this.interval);
    }

    getMessages = async () => {
      const messagesCall = await fetch(global.url+'/api/chat');
      const messagesJson = await messagesCall.json();
      this.setState({messages: messagesJson['data']});
    }

    validateInputs = (input) => {
      if(input !== null & input !== '' && typeof input !== undefined) {
        return true;
      }
      return false;
    }

    resetInputs = () => {
      this.state.message = '';
      this.messageInput.current._root.clear();
    }

    sendMessage = () => {
      
      // validate inputs
      this.validateInputs(this.state.id);
      this.validateInputs(this.state.messages);

      // dergo mesazhin me api
      fetch(global.url + '/api/chat', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json',},
        body: JSON.stringify({ 'id': this.state.id, 'message': this.state.message })
      }).then(() => { this.getMessages(); }).catch(err => console.log('Message not sent: ', err));

      // reset inputs      
      this.resetInputs();
    }

    render() {
      if(this.state.loading == true) {
        return (
          <Spinner color="blue"></Spinner>
        )
      }
      return (
        <Container style={{ backgroundColor: '#F5F5F5' }}>

        	<KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset="20" enabled>

        	<Content style={{ marginTop: 5}}>
        	  <List>
              <FlatList
                inverted={-1}
                data={this.state.messages}
                keyExtractor={(item,i) => i.toString()}
                renderItem={({item, i}) => (
                  <List key={i} style={(this.state.id == item.user_id) ? styles.messageMe : styles.message}>
        	        <ListItem avatar>
        	          <Left>
        	            <Thumbnail style={(this.state.id == item.user_id) ? styles.avatarMe : styles.avatar} source={{ uri: global.url+'/images/user.png' }} />
        	          </Left>
        	          <Body style={(this.state.id == item.user_id) ? styles.messageBodyMe : styles.messageBody}>
        	            <Text note style={(this.state.id == item.user_id) ? styles.timeMe: styles.time}>{item.time}</Text>
        	            <Text style={(this.state.id == item.user_id) ? styles.messageAuthorMe : styles.messageAuthor}>{item.author}</Text>
        	            <Text style={(this.state.id == item.user_id) ? styles.messageTextMe : styles.messageText} note>{item.message}</Text>
        	          </Body>
        	        </ListItem>
        	      </List>
                )}/>
            </List>
        	</Content>

        	  <Item style={{ borderColor: '#aaaaaa', margin: 10, marginLeft: 10}} rounded primary>
        	    <Input
        	      placeholder='Mesazhi'
        	      placeholderStyle={{color:'#aaaaaa'}}
        	      ref={this.messageInput}
        	      onChangeText={(message) => this.setState({message})}
        	      value={this.state.message}/>
        	      <Button style={{ marginRight: 3, marginTop: 2 }} rounded onPress={this.sendMessage}>
        	        <Icon style={{ fontSize: 20 }} name='paper-plane' />
        	      </Button>
        	  </Item>


        	<MyFooter navigation={this.props.navigation}/>
        	</KeyboardAvoidingView>

        </Container>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  message: {
      marginRight: 50
  },

  messageMe: {
    marginLeft: 100,
    marginRight: 10,
  },

  avatar: {
    height: 40,
    width: 40
  },

  avatarMe: {
    display: 'none'
  },

  messageBody: {
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 0,
    borderRadius: 25,
    marginTop: 10,
  },

  messageBodyMe: {
    backgroundColor: '#5867dd',
    borderBottomWidth: 0,
    borderRadius: 25,
    marginTop: 10
  },

  time: {
    marginLeft: 20,
    fontSize: 12
  },

  timeMe: {
    marginLeft: 20,
    fontSize: 12,
    color: '#eee'
  },

  messageAuthor: {
      marginLeft: 20,
      color: '#5867dd'
  },

  messageAuthorMe: {
    display: 'none'
  },

  messageText: {
    color: '#222',
    marginLeft: 20,
  },

  messageTextMe: {
    color: '#FFF',
    marginLeft: 20,
  }
});

AppRegistry.registerComponent('Chat', () => Chat);
