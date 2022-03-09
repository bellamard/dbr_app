import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  BackHandler,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';

import axios from 'axios';
import Styles from './style';
const user = require('../../../images/user.jpg');
const errorImage = require('../../../images/logout.png');

const Profil = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;

  const backAction = () => {
    Alert.alert('Quitter', 'Êtes-vous sûr de vouloir quitter ?', [
      {
        text: 'NON',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'OUI', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const backAction = () => {
      navigation.push('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={Styles.container}>
      <View style={Styles.boxUser}>
        <Image source={user} style={Styles.userLogos} />
        <View>
          <Text style={Styles.userName}>{username}</Text>
          <Text style={Styles.userPhone}>{phone}</Text>
        </View>
      </View>
      <View style={Styles.body}>
        <Text style={Styles.title}>Profil</Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.push('login')}>
          <Text style={Styles.buttonText}>Modifier Mot de passe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => navigation.push('login')}>
          <Text style={Styles.buttonText}>Se Déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={Styles.buttonAnnuler}
          onPress={() => backAction()}>
          <Text style={Styles.buttonText}>Quitter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profil;
