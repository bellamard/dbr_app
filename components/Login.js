import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import Styles from './style';
import axios from 'axios';
const back = require('../images/bg.jpg');
const logos = require('../images/picture.png');

const Login = ({navigation, route}) => {
  const [logout, setLogout] = useState(false);
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const getconnexion = () => {
    setIsLoading(true);
    setIsError(false);
    const url = 'https://assembleenationalerdc.org/db_app/login.php';
    if (password.length >= 6) {
      if (number.length === 9) {
        axios
          .post(url, {code: number, pass: password})
          .then(res => {
            const {type, code, ident, msg, error} = res.data;
            if (type > 0) {
              navigation.push('Home', {ident, code});
              setIsLoading(false);
            } else {
              setPassword('');
              setNumber('');
              setIsLoading(false);
              setMessageError(error);
              setIsError(true);
            }
          })
          .catch(error => {
            setPassword('');
            setNumber('');
            setIsLoading(false);
            setIsError(true);
            setMessageError(error);
          });
      } else {
        setMessageError('Numéro incorrect');
        setPassword('');
        setNumber('');
        setIsLoading(false);
        setIsError(true);
      }
    } else {
      setMessageError('Mot de passe incorrect');
      setPassword('');
      setIsLoading(false);
      setIsError(true);
    }
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Quitter', 'Êtes-vous sûr de vouloir quitter ?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  // const backHandler = BackHandler.addEventListener(
  //   'hardwareBackPress',
  //   backAction,
  // );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <ImageBackground source={back} style={Styles.container}>
      <View style={Styles.layout}>
        <Image source={logos} style={Styles.logos} />
        <Text style={Styles.title}>Dbr</Text>
        <Text style={Styles.title2}>Money Transfert</Text>
        <Text>Login</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={Styles.boxlogin}>
            <View style={Styles.inputPhone}>
              <Text>+243</Text>
              <TextInput
                placeholder="Identifiant"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
              />
            </View>

            <TextInput
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={Styles.input}
            />
            <TouchableOpacity
              style={Styles.buttonAcceder}
              onPress={() => {
                getconnexion();
              }}>
              <Text style={Styles.buttonTitle}>SE CONNECTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('motpasse');
              }}>
              <Text>Mot de passe oublie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('Singin');
              }}>
              <Text>S'inscrire</Text>
            </TouchableOpacity>
            <Text style={Styles.error}>{isError ? messageError : null}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Login;
