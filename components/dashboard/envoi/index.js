import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Styles from './style';
const user = require('../../../images/user.jpg');

const Envoi = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;
  const [numberRecipient, setNumberRecipient] = useState('');
  const [device, setDevice] = useState('USD');
  const [solde, setSolde] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [costs, setCosts] = useState(0);
  const [password, setPassword] = useState('');
  const myModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text>Client:{username}</Text>
              <Text>bénéficiaire:{recipientName}</Text>
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
              onPress={() => setModalVisible(!modalVisible)}>
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
        <Text style={Styles.title}>Envoi</Text>
        <View style={Styles.boxDevices}>
          <Text style={Styles.itemName}>Numéro du bénéficiaire</Text>
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
              <TextInput
                placeholder="ex: 100.00"
                value={solde}
                onChangeText={setSolde}
                keyboardType="numeric"
              />
              <Text style={Styles.itemName}>{device}</Text>
            </View>
          </View>
          {myModal()}
          <TouchableOpacity
            style={Styles.button}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={Styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.buttonAnnuler}
            onPress={() => navigation.push('Dashboard')}>
            <Text style={Styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Envoi;
