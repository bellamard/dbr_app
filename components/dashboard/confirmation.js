import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
const valider = require('../../images/valider.png');
const user = require('../../images/user.jpg');

const Confirmation = ({navigation, route}) => {
  const [exped, setExped] = useState('');
  const [message, setMessage] = useState('');
  const [myIdent, setMyIdent] = useState({});
  const getMessage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('messageConfirmation');
      const {exped, message} = jsonValue ? JSON.parse(jsonValue) : {};
      setMessage(message);
      setExped(exped);
    } catch (e) {
      // error reading value
    }
  };

  getMessage();
  return (
    <View style={Styles.container}>
      <View style={Styles.layoutValidator}>
        <View style={Styles.userValidator}>
          <Image source={user} style={Styles.network} />
          <Text style={Styles.userValidatorTitle}>À: +243{exped}</Text>
        </View>
        <View style={Styles.messageValidator}>
          <Image source={valider} style={Styles.network} />
          <Text style={Styles.messagesValidatorDescription}>{message}</Text>
        </View>

        <TouchableOpacity
          style={Styles.buttonValidator}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text>Retour au Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Confirmation;
