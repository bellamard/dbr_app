import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Styles from './style';
const user = require('../../../images/user.jpg');
const Achat = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;
  const [numberShop, setNumberShop] = useState('');
  const [numberArticle, setNumberArticle] = useState('');

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

          <Text style={Styles.itemName}>Numéro de l'Article</Text>
          <TextInput
            placeholder="ex: 999999"
            style={Styles.itemArticle}
            value={numberArticle}
            onChangeText={setNumberArticle}
            keyboardType="numeric"
          />
          <TouchableOpacity style={Styles.button}>
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

export default Achat;
