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
    const url = 'https://assembleenationalerdc.org/db_app/regist.php';

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
            .then(res => {
              setIsLoading(false);
              const {type, code, error} = res.data;
              console.log(res);
              if (type > 0) {
                setConfirmed(code);
                setModalVisible(true);
              } else {
                setIsError(true);
                setMessagError('Erreur: ' + error);
                setNames('');
                setPhone('');
                setMail('');
                setPassword('');
                setPasswordConfirme('');
              }
            })
            .catch(error => {
              setIsLoading(false);
              setMessagError('erreur de connexion');
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
    if (code === confirmed) {
      const url = 'https://assembleenationalerdc.org/db_app/confirmCode.php';
      axios
        .post(url, {names, phone, password, code})
        .then(res => {
          const {name, phone, type, error} = res.data;

          if (type > 0) {
            setModalVisible(false);

            navigation.push('Login', {name, phone});
          } else {
            setIsError(true);
            setIsLoading(false);
            setMessageModal('Erreur: ' + error);
          }
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
                secureTextEntry={true}
              />
              <TextInput
                style={Styles.input}
                placeholder="Confirmation Mot de passe"
                value={passwordConfirme}
                onChangeText={setPasswordConfirme}
                secureTextEntry={true}
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
