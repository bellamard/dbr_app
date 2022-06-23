import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import Styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const user = require('../../images/user.jpg');
const quitter = require('../../images/quitter.png');
const retrait = require('../../images/retrait.png');
const envoye = require('../../images/envoye.png');
const rapport = require('../../images/rapport.png');
const achat = require('../../images/achat.png');
const profil = require('../../images/profil.png');
const network = require('../../images/network.png');
// const mySolde = async data => {
//   setIsLoading(true);
//   return axios
//     .post('http://assembleenationalerdc.org/db_app/solde.php', {
//       code: data,
//     })
//     .then(res => {
//       setIsLoading(false);
//       const {usd, cdf, type, error} = res.data;
//       console.log(res);
//       if (type > 0) {
//         setUsd(usd);
//         setCdf(cdf);
//       } else {
//         setMessageError(error);
//         setIsError(true);
//       }
//     })
//     .catch(error => {
//       setIsLoading(false);
//       setIsError(true);
//       setMessageError('Erreur de connexion');
//     });
// };

const Dashboard = ({navigation, route}) => {
  const [soldeUsd, setUsd] = useState(0);
  const [soldeCdf, setCdf] = useState(0);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [messagError, setMessageError] = useState('Erreur de connexion');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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
          setCdf(cdf);
          setUsd(usd);
          saveUser({
            code: phone,
            ident: username,
            usd: soldeUsd,
            cdf: soldeCdf,
          });
        } else {
          setIsError(true);
          setMessageError(error);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setIsError(true);
        setMessageError('Erreur de connexion');
      });
  };
  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const {code, ident, usd, cdf} = jsonValue ? JSON.parse(jsonValue) : {};
        setPhone(code);
        setUsername(ident);
        setUsd(usd);
        setCdf(cdf);
      } catch (e) {
        // error reading value

        setIsError(true);
        setMessageError('Erreur grave ressayer de vous connecter');
      }
      setIsLoading(false);
    };
    getUser();
    const backAction = () => {
      Alert.alert('Quitter', 'Êtes-vous sûr de vouloir quitter ?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
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

      <View style={Styles.layout}>
        {isError ? (
          <View style={Styles.boxnetwork}>
            <Image style={Styles.network} source={network} />
            <Text>{messagError}</Text>
            <TouchableOpacity style={Styles.devise} onPress={() => getSolde()}>
              <Text style={Styles.deviseText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <TouchableOpacity onPress={() => getSolde()}>
                  <View style={Styles.layoutSold}>
                    <Text style={Styles.soldeTitle}>Soldes:</Text>
                    <View style={Styles.boxSold}>
                      <View style={Styles.soldeInfos}>
                        <Text style={Styles.deviseTitle}>SOLDE:</Text>
                        <View style={Styles.dashSoldes}>
                          <View style={Styles.dashSolde}>
                            <Text style={Styles.counter}>{soldeUsd}</Text>
                            <Text style={Styles.titleCounter}>USD</Text>
                          </View>
                          <View style={(Styles.dashSolde, Styles.separator)}>
                            <Text style={Styles.counter}>{soldeCdf}</Text>
                            <Text style={Styles.titleCounter}>CDF</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={Styles.layoutSold}>
                  <Text style={Styles.soldeTitle}>Opération</Text>
                  <View style={Styles.boxOperation}>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => navigation.push('Retrait')}>
                      <Image source={retrait} style={Styles.itemOperation} />
                      <Text>Rétrait</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => navigation.push('Envoi')}>
                      <Image source={envoye} style={Styles.itemOperation} />
                      <Text>Envoi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => navigation.push('Achater')}>
                      <Image source={achat} style={Styles.itemOperation} />
                      <Text>Achat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => navigation.push('Operation')}>
                      <Image source={rapport} style={Styles.itemOperation} />
                      <Text>Liste Operation</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => navigation.push('Profil')}>
                      <Image source={profil} style={Styles.itemOperation} />
                      <Text>Profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.operation}
                      onPress={() => backAction()}>
                      <Image source={quitter} style={Styles.itemOperation} />
                      <Text>Quitter</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text>
                  Copyright &copy; DIEU EST BON ET RICHE{' '}
                  {new Date().getFullYear()}
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Dashboard;
