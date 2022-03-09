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
} from 'react-native';
import axios from 'axios';
import Styles from './style';
const user = require('../../../images/user.jpg');

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
    {
      id: 1,
      user: 895127236,
      username: 'bellamard',
      date: '2020-01-01',
      solde: 1000,
      type: 'retrait',
    },
    {
      id: 2,
      user: 895127246,
      username: 'alex',
      date: '2020-01-01',
      solde: 1000,
      type: 'retrait',
    },
    {
      id: 3,
      user: 895127246,
      username: 'alex',
      date: '2020-01-01',
      montant: 1000,
      type: 'retrait',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      navigation.push('Dashboard');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  const myModal = item => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text style={Styles.itemtitle}>RE:{item.username}</Text>
              <Text style={Styles.itemtitle}>Phone:{item.user}</Text>
              <Text style={Styles.itemDescription}>Montant:{item.montant}</Text>
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
        <Text style={Styles.title}>Operations</Text>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Operation;
