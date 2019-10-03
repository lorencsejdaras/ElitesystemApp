import React from 'react';
import { Image, View, AsyncStorage } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  Button,
  Icon,
} from 'native-base';

import Login from './components/views/Login';
import Home from './components/views/Home';
import Chat from './components/views/Chat';
import Purchases from './components/views/Purchases';
import Settings from './components/views/Settings';
import Todo from './components/views/Todo';

const MainNavigator = createStackNavigator({


  Login: {
    screen: Login,
    title: 'Login',
    navigationOptions: { header: null }
  },

  Home: {
    screen: Home ,
    navigationOptions: {
      title: 'Home',
      headerTintColor: '#FFFFFF',
      headerRight: <View><Button transparent><Icon name="search" style={{ color: '#FFFFFF' }}/></Button></View>,
      headerStyle: {
        height: 50,
        backgroundColor: '#5867dd'
      },
    }
  },

  Chat: {
    screen: Chat,
    navigationOptions: {
      title: 'Biseda',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        height: 50,
        backgroundColor: '#5867dd'
      }
    }
  },

  Todo: {
    screen: Todo,
    navigationOptions: {
      title: 'Todo',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        height: 50,
        backgroundColor: '#5867dd'
      }
    }
  },

  Purchases: {
    screen: Purchases,
    navigationOptions: {
      title: 'Blerjet',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        height: 50,
        backgroundColor: '#5867dd'
      }
    }
  },

  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Konfigurimet',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        height: 50,
        backgroundColor: '#5867dd'
      }
    }
  }

});

const App = createAppContainer(MainNavigator);

export default App;
