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
const user = require('../../../images/user.jpg');
const errorImage = require('../../../images/logout.png');

const Item = ({name, type, date}) => {
  return (
    <View>
      <View style={Styles.itembox}>
        <Image source={user} style={Styles.itemboxTitleImage} />
        <Text style={Styles.itemtitle}>{name}</Text>
      </View>
      <View style={Styles.itemboxInfos}>
        <Text style={Styles.itemDescription}>{type}</Text>
        <Text>{date}</Text>
      </View>
    </View>
  );
};
const Operation = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [transactions, setTransactions] = useState([
    // {
    //   id: 1,
    //   user: 895127236,
    //   username: 'bellamard',
    //   type: 'Rétrait',
    //   solde: 100,
    //   device: 'USD',
    //   date: '2020-02-08',
    // },
    // {
    //   id: 2,
    //   user: 895127236,
    //   username: 'b2la',
    //   type: 'Rétrait',
    //   solde: 100,
    //   device: 'USD',
    //   date: '2020-02-08',
    // },
    // {
    //   id: 3,
    //   user: 895127236,
    //   username: 'b2la',
    //   type: 'Rétrait',
    //   solde: 100,
    //   device: 'USD',
    //   date: '2020-02-08',
    // },
    // {
    //   id: 4,
    //   user: 895127236,
    //   username: 'b2la',
    //   type: 'Rétrait',
    //   solde: 100,
    //   device: 'USD',
    //   date: '2020-02-08',
    // },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const receiveTransaction = () => {
      const url = 'http://localhost:3000/api/transaction/';
      axios
        .post(url, {phone})
        .then(res => {
          setIsLoading(false);
          setTransactions(res);
        })
        .catch(error => {
          setIsLoading(false);
          setIsError(true);
          setMessageError('Pas des Transaction');
        });
    };
    const backAction = () => {
      navigation.push('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    receiveTransaction();
    return () => backHandler.remove();
  }, [navigation, phone]);
  const myModal = item => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text style={Styles.itemtitle}>RE:{item.username}</Text>
              <Text style={Styles.itemtitle}>Phone:{item.user}</Text>
              <Text style={Styles.itemDescription}>
                Montant:{item.solde} {item.device}
              </Text>
              <Text style={Styles.itemType}>Type:{item.type}</Text>
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
        {myModal(item)}
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Item name={item.username} type={item.type} date={item.date} />
        </TouchableOpacity>
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
  const messageView = () => (
    <View style={Styles.boxError}>
      <Image source={errorImage} style={Styles.imageError} />
      <Text style={Styles.error}>{messageError}</Text>
    </View>
  );

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
        ) : isError ? (
          messageView()
        ) : (
          panel()
        )}
      </View>
    </View>
  );
};

export default Operation;
