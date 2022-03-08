import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Styles from './style';
const user = require('../../../images/user.jpg');

const Achat = ({navigation, route}) => {
  const [username, setUsername] = useState('user') || route.params.name;
  const [phone, setPhone] = useState('089 XXX XXX XXX') || route.params.phone;
  const [numberShop, setNumberShop] = useState('');
  const [numberArticle, setNumberArticle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [ShopName, setShopName] = useState('');
  const [ArticleName, setArticleName] = useState('');
  const [ArticlePrice, setArticlePrice] = useState('');
  const [ArticleQuantity, setArticleQuantity] = useState('');
  const [password, setPassword] = useState('');

  const myModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <View style={Styles.boxConfirmation}>
              <Text>Client:{username}</Text>
              <Text>Etablissemnet:{ShopName}</Text>
              <Text>Article:{ArticleName}</Text>
              <Text>Nombre d'article:{ArticleName}</Text>
              <Text>Prix:{ArticlePrice}</Text>
              <Text>Frais:</Text>
              <Text>Prix Total:</Text>
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
          <Text style={Styles.itemName}>Nombre des Articles</Text>
          <TextInput
            placeholder="ex: 99"
            style={Styles.itemArticle}
            value={ArticleQuantity}
            onChangeText={setArticleQuantity}
            keyboardType="numeric"
          />
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

export default Achat;
