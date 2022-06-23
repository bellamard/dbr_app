import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  BackHandler,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
const user = require('../../../images/user.jpg');
const errorImage = require('../../../images/logout.png');

const Item = ({recipient, description, date}) => {
  return (
    <View>
      <View style={Styles.itembox}>
        <Image source={user} style={Styles.itemboxTitleImage} />
        <Text style={Styles.itemtitle}>+243 {recipient}</Text>
      </View>
      <View style={Styles.itemboxInfos}>
        <Text>{description}</Text>
        <Text style={Styles.itemDescription}>{date}</Text>
      </View>
    </View>
  );
};
const Operation = ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        const {code, ident} = jsonValue ? JSON.parse(jsonValue) : {};
        setPhone(code);
        setUsername(ident);

        const receiveTransaction = () => {
          const url = 'https://assembleenationalerdc.org/db_app/Operation.php';
          axios
            .post(url, {code})
            .then(res => {
              const {type, error, operations} = res.data;

              if (type === '0') {
                setIsError(true);
                setMessageError(error);
              } else {
                setTransactions(operations);

                console.log(operations);
              }
            })
            .catch(error => {
              setIsError(true);
              setMessageError('Erreur de connexion');
            });
        };
        receiveTransaction();
        setIsLoading(false);
      } catch (e) {
        // error reading value
        setIsLoading(false);
        setIsError(true);
        setMessageError('Erreur grave reessayer de vous connecter');
      }
    };

    getUser();

    const backAction = () => {
      navigation.push('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation, phone]);

  const backHome = () => {
    navigation.push('Dashboard');
    return true;
  };
  const myModal = item => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text style={Styles.itemtitle}>
                Phone:{item.exped === phone ? item.destin : item.exped}
              </Text>
              <Text style={Styles.itemDescription}>{item.msg}</Text>
              <Text style={Styles.itemtitle}>Date:{item.date}</Text>
            </View>

            <TouchableOpacity
              style={Styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={Styles.buttonText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const renderItem = ({item}) => {
    return (
      <View>
        {/* {myModal(item)}
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}> */}
        <Item
          description={item.msg}
          recipient={item.exped === phone ? item.destin : item.exped}
          date={item.date}
        />
        {/* </TouchableOpacity> */}
      </View>
    );
  };

  const panel = () => (
    <View>
      <Text style={Styles.title}>Operations</Text>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
  const messageView = () => {
    return isError ? (
      <View style={Styles.boxError}>
        <Image source={errorImage} style={Styles.imageError} />
        <Text style={Styles.error}>{messageError}</Text>
        <TouchableOpacity
          onPress={() => backHome()}
          style={Styles.itemboxInfos}>
          <Text>Accueil</Text>
        </TouchableOpacity>
      </View>
    ) : (
      panel()
    );
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
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          messageView()
        )}
      </View>
    </View>
  );
};

export default Operation;
