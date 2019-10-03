import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage
  } from 'react-native';

  import MyFooter from '../Footer.js';

export default class Login extends Component {

    constructor(props) {
      super(props);

      this.state = {
        email: '',
        password : '',
        uri: global.url,
        logged: ''
      };

      const email =  AsyncStorage.getItem('@elitesystem:email');
      const password =  AsyncStorage.getItem('@elitesystem:password');
      if(typeof(email) == String && typeof(password) == String) {
        this.setState({email: email});
        this.setState({password: password});
      }
    }

    loginPressed = () => {
      const { email,password }  = this.state;
      const { navigate } = this.props.navigation;

      fetch(this.state.uri + '/api/login', {
        method: 'POST',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           email: email,
           password: password
        })
      })
      .then(res => res.json())
      .then(json => {
        if(json['login'] == true) {
          // vendos variabla globale
          try {
            AsyncStorage.removeItem('@elitesystem:login');
            AsyncStorage.setItem('@elitesystem:login', JSON.stringify(json['login']));
            AsyncStorage.removeItem('@elitesystem:id');
            AsyncStorage.setItem('@elitesystem:id', JSON.stringify(json['id']));
            AsyncStorage.setItem('@elitesystem:email', JSON.stringify(this.state.email));
            AsyncStorage.setItem('@elitesystem:password', JSON.stringify(this.state.password));
          } catch (err) {
            console.log('Async storage error: ', err);
          }
          // shko ne home
          navigate('Home');
        } else {
          Alert.alert('Gabim', 'Kredinciale te gabuara');
          navigate('Home');
        }
      })
      .catch(err => console.log(err));

    }

    render() {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.content}>

            <Image
            style={styles.logo}
            source={require('../../assets/logo-white.png')}
            />

            <TextInput
              value={this.state.email}
              onChangeText={(email) => this.setState({ email} )}
              style={styles.textInput}
              placeholder="Adresa Email"
              placeholderTextColor="#eee"
              autoCapitalize="none"
            />

            <TextInput
              value={this.state.password}
              onChangeText={(password) => this.setState({ password} )}
              style={styles.textInput}
              placeholder="Fjalekalimi"
              placeholderTextColor="#eee"
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <Text
              style={styles.primaryButton}
              onPress={this.loginPressed}>
              <Text> Login </Text>
            </Text>

          </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5867dd',
      alignItems: 'center',
      justifyContent: 'center',
    },

    content: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    logo: {
      resizeMode:'contain',
      maxWidth: 200
    },

    textInput: {
      paddingHorizontal: 10,
      marginTop: 15,
      width: 300,
      height: 60,
      borderColor: '#eee',
      borderRadius: 30,
      borderWidth: 1,
      color: '#FFF'
    },
    primaryButton: {
      backgroundColor: '#3447dd',
      borderRadius: 30,
      marginTop: 30,
      width: 250,
      paddingVertical: 20,
      textTransform: 'uppercase',
      padding: 10,
      color: '#FFF',
      textAlign: 'center',
    },
  });

  AppRegistry.registerComponent('Login', () => Login);
