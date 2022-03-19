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
import axios from 'axios';
const user = require('../../images/user.jpg');
const quitter = require('../../images/quitter.png');
const retrait = require('../../images/retrait.png');
const envoye = require('../../images/envoye.png');
const rapport = require('../../images/rapport.png');
const achat = require('../../images/achat.png');
const profil = require('../../images/profil.png');
const network = require('../../images/network.png');

const Dashboard = ({navigation, route}) => {
  const [devices, setDevices] = useState('USD');
  const [usd, setUsd] = useState(0.0);
  const [cdf, setCdf] = useState(0.0);
  const [solde, setsolde] = useState(usd);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [messagError, setMessageError] = useState('error');
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
  console.log(route.params);

  useEffect(() => {
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

  const setViewDevices = (device, compte) => {
    setDevices(device);
    setsolde(compte);
  };

  useEffect(() => {
    const mySolde = () => {
      setIsLoading(true);
      return axios
        .post('https://localhost:5000/solde/', {phone})
        .then(data => {
          setIsLoading(false);
          const {_usd, _cdf} = data;
          setUsd(_usd);
          setCdf(_cdf);
        })
        .catch(error => {
          setIsLoading(false);
          setIsError(true);
          setMessageError('Erreur de connexion');
        });
    };
    mySolde();
  }, [phone]);

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
        {!isError ? (
          <View style={Styles.boxnetwork}>
            <Image style={Styles.network} source={network} />
            <Text>{messagError}</Text>
          </View>
        ) : (
          <ScrollView>
            {isLoading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View>
                <View style={Styles.layoutSold}>
                  <Text style={Styles.soldeTitle}>Soldes:</Text>
                  <View style={Styles.boxSold}>
                    <View>
                      <TouchableOpacity
                        style={Styles.devise}
                        onPress={() => setViewDevices('CDF', cdf)}>
                        <Text style={Styles.deviseTitle}>CDF</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={Styles.devise}
                        onPress={() => setViewDevices('USD', usd)}>
                        <Text style={Styles.deviseTitle}>USD</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={Styles.soldeInfos}>
                      <Text style={Styles.deviseTitle}>SOLDE:</Text>
                      <Text>{solde}</Text>
                      <Text>{devices}</Text>
                    </View>
                  </View>
                </View>

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
