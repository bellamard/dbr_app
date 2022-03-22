import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Styles from './style';
const user = require('../../../images/user.jpg');

const Retrait = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [agent, setAgent] = useState('');
  const [device, setDevice] = useState('USD');
  const [solde, setSolde] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [total, setTotal] = useState('');
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
              <Text>Numéro Agent:{agent}</Text>
              <Text>Prix:{solde}</Text>
              <Text>Frais:{costs}</Text>
              <Text>Prix Total:{total}</Text>
              <TextInput
                placeholder="entre votre code secret"
                style={Styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
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
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const sendTransaction = () => {
    setIsError(false);
    if (agent.length !== 9 && solde === '') {
      setMessagError('Veuillez remplir correctement les champs');
      setIsError(true);
      setSolde('');
      setAgent('');
    } else {
      setIsLoading(true);
      getOperation();
    }
  };
  const saveMsg = async value => {
    try {
      await AsyncStorage.setItem('messageConfirmation', JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const confirmationTransaction = () => {
    setIsLoading(true);
    setIsError(false);
    if (password.length === 0) {
      setMessagError('Veuillez remplir correctement les champs');
      setIsError(true);
      setPassword('');
    } else {
      const url =
        'http://assembleenationalerdc.org/db_app/confirmtransfert.php';
      axios
        .post(url, {
          code: phone,
          password,
          agent,
          devise: device,
          prix: solde,
          frais: costs,
          total,
        })
        .then(res => {
          const {type, msg, error} = res.data;
          console.log(res);
          setIsLoading(false);
          if (type === '1') {
            setModalVisible(false);
            saveMsg({message: msg, exped: agent});
            navigation.navigate('Confirmation');
          } else {
            setMessagError(error);
            setIsError(true);
            setPassword('');
          }
        })
        .catch(err => {
          setIsLoading(false);
          setMessagError("Erreur d'operation");
          setIsError(true);
          setPassword('');
          console.log(err);
        });
    }
  };
  const getOperation = () => {
    return axios
      .post('http://assembleenationalerdc.org/db_app/transfert.php', {
        code: phone,
        devise: device,
        price: solde,
        agent,
      })
      .then(res => {
        setIsLoading(false);
        const {type, frais, total, error} = res.data;
        if (type === '1') {
          setCosts(frais);
          setTotal(total);
          setModalVisible(true);
        } else {
          setIsError(true);
          setMessagError(error);
        }
      })
      .catch(err => {
        setIsLoading(false);
        setIsError(true);
        setMessagError("Erreur d'operation! probleme de connexion");
        console.log(err);
      });
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
        setMessagError('Erreur grave ressayer de vous connecter');
      }
    };
    getUser();
  }, []);
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
              value={agent}
              onChangeText={setAgent}
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
          <View>
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
    </View>
  );
};
export default Retrait;
