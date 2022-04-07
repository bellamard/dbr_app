import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  BackHandler,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from './style';
const user = require('../../../images/user.jpg');
const errorImage = require('../../../images/logout.png');
const visibity = require('../../../images/visibility.png');

const Profil = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordActuel, setPasswordActuel] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirmation, setPasswordconfirmation] = useState('');
  const [ModalVisible, setModalVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messagError, setMessagError] = useState('');
  const [isVisible, setIsVisible] = useState(true);
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

  const confirmationModifier = () => {
    setIsLoading(true);
    setIsError(false);
    const url = 'http://assembleenationalerdc.org/db_app/update.php';
    if (passwordNew.length >= 6) {
      if (passwordConfirmation === passwordNew) {
        axios
          .post(url, {code: phone, pass: passwordActuel, modif: passwordNew})
          .then(res => {
            setIsLoading(false);

            const {msg, type, error} = res.data;
            if (type === '0') {
              setIsError(true);
              setMessagError(error);
            } else {
              setModalVisible(false);
              Alert.alert('Modification', msg);
            }
          })
          .catch(err => {
            console.log(err);
            setIsLoading(false);
            setIsError(true);
            setMessagError('Erreur de modification');
          });
      } else {
        setIsLoading(false);
        setIsError(true);
        setMessagError("Mot de passe n'est pas identique");
      }
    } else {
      setIsLoading(false);
      setIsError(true);
      setMessagError("Mot de passe n'est pas conforme");
    }
  };
  const myModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={ModalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text>Mot de passe actuel:</Text>
              <View style={Styles.inputPasswordVisibility}>
                <TextInput
                  placeholder="entre votre mot de passe"
                  value={passwordActuel}
                  onChangeText={setPasswordActuel}
                  secureTextEntry={isVisible}
                />
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <Image source={visibity} style={Styles.visible} />
                </TouchableOpacity>
              </View>
              <Text>Nouveau Mot de passe:</Text>
              <View style={Styles.inputPasswordVisibility}>
                <TextInput
                  placeholder="entrer nouveau"
                  value={passwordNew}
                  onChangeText={setPasswordNew}
                  secureTextEntry={isVisible}
                />
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <Image source={visibity} style={Styles.visible} />
                </TouchableOpacity>
              </View>
              <Text>confirmer Mot de passe:</Text>
              <View style={Styles.inputPasswordVisibility}>
                <TextInput
                  placeholder="entrer Confirmer "
                  value={passwordConfirmation}
                  onChangeText={setPasswordconfirmation}
                  secureTextEntry={isVisible}
                />
                <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                  <Image source={visibity} style={Styles.visible} />
                </TouchableOpacity>
              </View>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <TouchableOpacity
                  style={Styles.button}
                  onPress={() => confirmationModifier()}>
                  <Text style={Styles.buttonText}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Styles.buttonAnnuler}
                  onPress={() => setModalVisible(!ModalVisible)}>
                  <Text style={Styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
                <Text style={Styles.error}>{isError ? messagError : null}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const {code, ident} = jsonValue ? JSON.parse(jsonValue) : {};
        setPhone(code);
        setUsername(ident);
        setIsLoading(false);
      } catch (e) {
        // error reading value
        setIsLoading(false);
        setIsError(true);
        setMessagError('Erreur grave reessayer de vous connecter');
      }
    };

    const backAction = () => {
      navigation.push('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    getUser();
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View style={Styles.container}>
      {myModal()}
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
          onPress={() => setModalVisible(!ModalVisible)}>
          <Text style={Styles.buttonText}>Modifier Mot de passe</Text>
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
