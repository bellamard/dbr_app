import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Styles from './style';
import axios from 'axios';
const back = require('../images/bg.jpg');
const logos = require('../images/picture.png');

const Singin = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [names, setNames] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirme, setPasswordConfirme] = useState('');
  const [mail, setMail] = useState('');
  const [code, setCode] = useState('');
  const [confirmed, setConfirmed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messagError, setMessagError] = useState('');
  const [messageModal, setMessageModal] = useState('');
  const myModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.boxModal}>
            <Text style={Styles.title3}>Noms: {names}</Text>
            <Text style={Styles.title3}>Téléphone: {phone}</Text>
            <Text style={Styles.title3}>Email: {mail}</Text>
            <TextInput
              placeholder="Code de confirmation"
              value={code}
              onChangeText={setCode}
              style={Styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity
              onPress={() => {
                confirmationCode();
              }}
              style={Styles.buttonAcceder}>
              <Text style={Styles.buttonTitle}>Confirmer</Text>
            </TouchableOpacity>
            <Text style={Styles.error}>{isError ? messageModal : null}</Text>
          </View>
        </View>
      </Modal>
    );
  };
  const getSingin = () => {
    setIsLoading(true);
    const url = 'http://localhost:3000/api/connexion';

    if (names !== '' && mail !== '') {
      if (phone.length === 9) {
        if (
          password !== '' &&
          password.length >= 6 &&
          passwordConfirme !== '' &&
          password === passwordConfirme
        ) {
          axios
            .post(url, {
              names,
              phone,
              password,
              mail,
            })
            .then(data => {
              setIsLoading(false);
              const {idCode, names} = data;
              setConfirmed(idCode);
              setModalVisible(true);
            })
            .catch(error => {
              setIsLoading(false);
              setMessagError(error);
              setIsError(true);
            });
        } else {
          setPassword('');
          setPasswordConfirme('');
          setMessagError('Mot de passe incorrect');
          setIsLoading(false);
          setIsError(true);
        }
      } else {
        setPhone('');
        setMessagError('numéro de téléphone incorrect');
        setIsLoading(false);
        setIsError(true);
      }
    } else {
      setNames('');
      setPhone('');
      setMail('');
      setPassword('');
      setPasswordConfirme('');
      setMessagError('le nom ou le mail est incorrect');
      setIsLoading(false);
      setIsError(true);
    }
  };
  const confirmationCode = () => {
    setIsLoading(true);
    setModalVisible(false);
    if (code === confirmed) {
      const url = 'http://localhost:3000/api/confirmation';
      axios
        .post(url, {code})
        .then(data => {
          const {_name, _phone} = data;
          navigation.push('Login', {_name, _phone});
        })
        .catch(error => {
          setMessageModal(error);
          setIsLoading(false);
        });
    } else {
      setMessageModal('Code incorrect');
      setModalVisible(!modalVisible);
    }
  };

  return (
    <ImageBackground source={back} style={Styles.container}>
      {myModal()}
      <ScrollView style={Styles.view}>
        <View style={Styles.layout}>
          <Image source={logos} style={Styles.logos} />
          <Text style={Styles.title}>Dbr</Text>
          <Text style={Styles.title2}>Money Transfert</Text>
          <Text>S'inscrire</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={Styles.boxlogin}>
              <TextInput
                style={Styles.input}
                placeholder="Noms"
                value={names}
                onChangeText={setNames}
              />
              <View style={Styles.inputPhone}>
                <Text>+243 </Text>
                <TextInput
                  placeholder="Téléphone"
                  keyboardType="numeric"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
              <TextInput
                style={Styles.input}
                placeholder="Email"
                value={mail}
                onChangeText={setMail}
              />
              <TextInput
                style={Styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={Styles.input}
                placeholder="Confirmation Mot de passe"
                value={passwordConfirme}
                onChangeText={setPasswordConfirme}
              />
              <TouchableOpacity onPress={() => {}} style={Styles.condition}>
                <Text style={{color: 'blue'}}>condition d'utlisation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  getSingin();
                }}
                style={Styles.buttonAcceder}>
                <Text style={Styles.buttonTitle}>J'ACCEPTER</Text>
              </TouchableOpacity>
              <Text style={Styles.error}>{isError ? messagError : null}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Singin;
