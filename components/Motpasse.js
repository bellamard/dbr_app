import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Styles from './style';
import axios from 'axios';
const back = require('../images/bg.jpg');
const logos = require('../images/picture.png');

const Motpasse = ({navigation}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const getconnexion = () => {
    setIsLoading(true);
    setIsError(false);
    if (name !== '') {
      if (number.length === 9) {
        const url = 'https://assembleenationalerdc.org/db_app/reinitpass.php';
        axios
          .post(url, {name, number})
          .then(res => {
            const {type, msg, error} = res.data;
            if (type > 0) {
              setIsLoading(false);
              navigation.push('Login');
            } else {
              setIsLoading(false);
              setIsError(true);
              setMessageError(error);
            }
          })
          .catch(error => {
            setIsLoading(false);
            setIsError(true);
            setMessageError(error);
          });
      } else {
        setIsLoading(false);
        setIsError(true);
        setMessageError('le numéro est incorret ' + number.length);
      }
    } else {
      setIsLoading(false);
      setIsError(true);
      setMessageError('le nom utilisateur est incorrect');
    }
  };

  return (
    <ImageBackground source={back} style={Styles.container}>
      <View style={Styles.layout}>
        <Image source={logos} style={Styles.logos} />
        <Text style={Styles.title}>Dbr</Text>
        <Text style={Styles.title2}>Money Transfert</Text>
        <Text>Réinitialisation du mot de passe</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={Styles.boxlogin}>
            <TextInput
              placeholder="Nom d'utilisateur"
              value={name}
              onChangeText={setName}
              style={Styles.input}
            />

            <View style={Styles.inputPhone}>
              <Text>+243</Text>
              <TextInput
                placeholder="téléphone"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              style={Styles.buttonAcceder}
              onPress={() => {
                getconnexion();
              }}>
              <Text style={Styles.buttonTitle}>Réinitialiser</Text>
            </TouchableOpacity>

            <Text style={Styles.error}>{isError ? messageError : null}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Motpasse;
