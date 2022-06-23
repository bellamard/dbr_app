import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const user = require('../../../images/user.jpg');

const Achat = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [numberShop, setNumberShop] = useState('');
  const [numberArticle, setNumberArticle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ShopName, setShopName] = useState('');
  const [ArticleName, setArticleName] = useState('');
  const [ArticlePrice, setArticlePrice] = useState('');
  const [password, setPassword] = useState('');
  const [messagError, setMessagError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [device, setDevice] = useState('USD');
  const [costs, setCosts] = useState('');
  const [total, setTotal] = useState('');

  const myModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text>Client:{username}</Text>
              <Text>Etablissemnet:{ShopName}</Text>
              <Text>Articles:{ArticleName}</Text>
              <Text>Nombre d'article:{ArticleName}</Text>
              <Text>Prix:{ArticlePrice}</Text>
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
            <TouchableOpacity
              style={Styles.button}
              onPress={() => confirmationAchat()}>
              <Text style={Styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.buttonAnnuler}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={Styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const saveMsg = async value => {
    try {
      await AsyncStorage.setItem('messageConfirmation', JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const saveUser = async value => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(value));
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getSolde = async () => {
    setIsLoading(true);
    const url = 'https://assembleenationalerdc.org/db_app/solde.php';
    return axios
      .post(url, {code: phone})
      .then(response => {
        setIsLoading(false);
        const {usd, cdf, type, error} = response.data;
        if (type > 0) {
          saveUser({
            code: phone,
            ident: username,
            usd,
            cdf,
          });
        } else {
          setIsError(true);
          setMessagError(error);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        setMessagError('Erreur de connexion  lors de la vérification du solde');
      });
  };

  const confirmationAchat = () => {
    setIsLoading(true);
    setIsError(false);
    if (password.length === 0) {
      setMessagError('Veuillez remplir correctement les champs');
      setIsError(true);
      setPassword('');
    } else {
      const url = 'https://assembleenationalerdc.org/db_app/confirmAchat.php';
      axios
        .post(url, {
          code: phone,
          password,
          exped: numberShop,
          devise: device,
          prix: ArticlePrice,
          frais: costs,
          total,
        })
        .then(res => {
          const {type, msg, error} = res.data;
          console.log(res);
          setIsLoading(false);
          if (type === '1') {
            getSolde();
            setModalVisible(false);
            saveMsg({message: msg, exped: numberShop});
            navigation.navigate('Confirmation');
          } else {
            setMessagError(error);
            setIsError(true);
            setPassword('');
          }
        })
        .catch(err => {
          setIsLoading(false);
          setMessagError("Erreur d'operation vérifier votre connection");
          setIsError(true);
          setPassword('');
          console.log(err);
        });
    }
  };

  const onlineAchat = () => {
    setIsLoading(true);
    setIsError(false);
    const url = 'https://assembleenationalerdc.org/db_app/achat.php';
    axios
      .post(url, {code: phone, numberShop, numberArticle, device})
      .then(res => {
        setIsLoading(false);
        const {msg, type, error} = res.data;
        if (type === '0') {
          setIsError(true);
          setMessagError(error);
        } else {
          setModalVisible(!modalVisible);
          setModalVisible(true);
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
        setMessagError('Erreur d operation');
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
        setMessagError('Erreur grave reessayer de vous connecter');
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={Styles.body}>
          <Text style={Styles.title}>Achat en ligne</Text>
          <View style={Styles.boxDevices}>
            <Text style={Styles.itemName}>Numéro de l'Etablissemnet</Text>
            <View style={Styles.itemNumber}>
              <Text>+243</Text>
              <TextInput
                placeholder="ex: 89 000 0000"
                value={numberShop}
                onChangeText={setNumberShop}
                keyboardType="numeric"
              />
            </View>

            <Text style={Styles.itemName}>Numéro de la facture</Text>
            <TextInput
              placeholder="ex: 999999"
              style={Styles.itemArticle}
              value={numberArticle}
              onChangeText={setNumberArticle}
              keyboardType="numeric"
            />
            <Text style={Styles.itemName}>Device</Text>
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
            {myModal()}
            <TouchableOpacity
              style={Styles.button}
              onPress={() => onlineAchat()}>
              <Text style={Styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.buttonAnnuler}
              onPress={() => navigation.push('Dashboard')}>
              <Text style={Styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
            <Text style={Styles.error}>{isError ? messagError : null}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Achat;
