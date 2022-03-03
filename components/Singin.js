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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
              onChangeText={() => setCode}
              style={Styles.input}
            />
            <TouchableOpacity onPress={() => {}} style={Styles.buttonAcceder}>
              <Text style={Styles.buttonTitle}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const getconnexion = () => {};
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
              <TouchableOpacity onPress={() => {}} style={Styles.buttonAcceder}>
                <Text style={Styles.buttonTitle}>J'ACCEPTER</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Singin;
