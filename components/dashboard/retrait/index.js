import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Styles from './style';
const user = require('../../../images/user.jpg');

const Retrait = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;
  const [numberRecipient, setNumberRecipient] = useState('');
  const [device, setDevice] = useState('USD');
  const [solde, setSolde] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [costs, setCosts] = useState(0);
  const [password, setPassword] = useState('');
  const [messagError, setMessagError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const myModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text>Client:{username}</Text>
              <Text>Agent:{recipientName}</Text>
              <Text>Numéro:{numberRecipient}</Text>
              <Text>Prix:{solde}</Text>
              <Text>Frais:{costs}</Text>
              <Text>Prix Total:{solde + costs}</Text>
              <TextInput
                placeholder="entre votre code secret"
                style={Styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={Styles.button}
              onPress={() => confirmationTransaction()}>
              <Text style={Styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.buttonAnnuler}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={Styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <Text style={Styles.error}>{isError ? messagError : null}</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const sendTransaction = () => {
    setIsError(false);
    if (numberRecipient.length != 9 && solde === '') {
      setMessagError('Veuillez remplir correctement les champs');
      setIsError(true);
      setSolde('');
      setNumberRecipient('');
    } else {
      setIsLoading(true);
      const url = 'http://localhost:3000/api/retrieve/send';
      axios
        .post(url, {phone, numberRecipient, device, solde})
        .then(res => {
          const {_recipientName, _costs} = res;
          setRecipientName(_recipientName);
          setCosts(_costs);
          setModalVisible(true);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setIsError(true);
          setMessagError("Erreur d'Operation");
          setSolde('');
          setNumberRecipient('');
          console.log(err);
        });
    }
  };
  const confirmationTransaction = () => {
    setIsError(false);
    if (password.length === 0) {
      setMessagError('Veuillez remplir correctement les champs');
      setIsError(true);
      setPassword('');
    } else {
      const url = 'http://localhost:3000/api/retrieve/confirm';
      axios
        .post(url, {phone, password, numberRecipient, device, solde, costs})
        .then(res => {
          navigation.push('confirmation', {
            recipientName,
            solde,
            costs,
            numberRecipient,
          });
          setModalVisible(false);
        })
        .catch(err => {
          setMessagError("Erreur d'operation");
          setIsError(true);
          setPassword('');
          console.log(err);
        });
    }
  };

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
        <Text style={Styles.title}>Rétrait</Text>
        <View style={Styles.boxDevices}>
          <Text style={Styles.itemName}>Numéro de l'agent</Text>
          <View style={Styles.itemNumber}>
            <Text>+243</Text>
            <TextInput
              placeholder="ex: 89 000 0000"
              value={numberRecipient}
              onChangeText={setNumberRecipient}
              keyboardType="numeric"
            />
          </View>
          <Text style={Styles.itemName}>Devices</Text>
          <View style={Styles.itemDevices}>
            <TouchableOpacity
              style={Styles.devise}
              onPress={() => setDevice('CDF')}>
              <Text style={Styles.deviseTitle}>CDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.devise}
              onPress={() => setDevice('USD')}>
              <Text style={Styles.deviseTitle}>USD</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={Styles.itemName}>Montants:</Text>
            <View style={Styles.itemNumber}>
              <Text style={Styles.itemName}>{device}</Text>

              <TextInput
                placeholder="ex: 100.00"
                value={solde}
                onChangeText={setSolde}
                keyboardType="numeric"
              />
            </View>
          </View>
          {myModal()}
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => sendTransaction()}>
                <Text style={Styles.buttonText}>Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.buttonAnnuler}
                onPress={() => navigation.push('Dashboard')}>
                <Text style={Styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
              <Text style={Styles.error}>{isError ? messagError : null}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Retrait;
