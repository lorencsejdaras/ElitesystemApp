import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  View,
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
  Separator,
  Body,
  Right,
  Thumbnail,
  Spinner,
  Badge,
  CheckBox
} from 'native-base';

import MyFooter from '../Footer';

// GLOBALS
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Todo extends Component {
    constructor(props) {
      super(props);
      
      this.state  = {
        id: null,
        todos: [],
        loading: true
      };
    }

    componentDidMount = async () => {
      // merr id te login user
      const id = await AsyncStorage.getItem('@elitesystem:id');
      this.setState({ id: id });
      // merr todo
      await this.getTodos();
    };

    getTodos = async () => {
      const todoCall = await fetch(global.url+'/api/todos');
      const todosJson = await todoCall.json();
      this.setState({todos: todosJson['data']});
      this.setState({loading: false})
    };

    isDone = ( item ) => {
      if( item.done == 0 ) {
        return false;
      }
      return true;
    }; 

    toggleDone = async ( item ) => {
        const todoUpdate = await fetch( global.url + '/api/todos/' + item.id, {
          'todo': item.id,
          method: 'PUT'
        });
        const res = await todoUpdate.json();
        // RENDER TODOS
        this.getTodos();
    };

    sendTodo = async () => {
      let todo = this.state.todo;
      if( todo !== null && todo !== '' && typeof todo !== 'undefined' ) {
        const req = await fetch( global.url + '/api/todos', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify( { 'user_id': this.state.id, 'todo': todo } )
        });
        // RESET TODO
        this.setState({ todo: null });
        // RENDER TODOS
        this.getTodos();
      }
    }

    deleteTodo = async ( item ) => {
      const req = await fetch( global.url + '/api/todos/' + item.id, { method: 'DELETE' });
      const res = await req.json();
      // RENDER TODOS
      this.getTodos();
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

            <List>

              <ListItem itemDivider style={{backgroundColor: '#eee'}}>
                <Text>Te Fundit</Text>
                <Badge primary style={{marginLeft: width * 0.54}}>
                  <Text style={{marginTop: 1}}>Total: {this.state.todos.length}</Text>
                </Badge>
              </ListItem>

            </List>

          <Content>

            {
              this.state.todos.map(( item, i ) => (
                <List key={i}>
                  <ListItem>
                      <CheckBox 
                        checked={ this.isDone( item ) } 
                        onPress={ () => this.toggleDone( item ) }
                         />
                      <Body>
                        <Text>{ item.todo }</Text>
                        <Text note>{ item.date } by { item.user }</Text>
                      </Body>
                      <Right>
                        <Ionicons 
                          style={ styles.deleteBtn } 
                          name="ios-trash" 
                          size={20}
                          onPress={ () => this.deleteTodo( item ) } />
                      </Right>
                  </ListItem>
                </List>
              ))
            }

          </Content>

          <Item style={{ borderColor: '#aaaaaa', margin: 10, marginLeft: 10}} rounded primary>
              <Input
                placeholder='Shto Todo '
                placeholderStyle={{color:'#aaaaaa'}}
                onChangeText={ ( todo ) => this.setState({ todo }) }
                value={ this.state.todo }/>
                <Button style={{ marginRight: 3, marginTop: 2 }} rounded onPress={() => this.sendTodo() }>
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
  deleteBtn: {
     backgroundColor: '#ff146c', 
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 15, 
     paddingRight: 15,
     borderRadius: 30, 
     color: 'white'
  }
});

AppRegistry.registerComponent('Todo', () => Todo);
