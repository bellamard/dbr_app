import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Styles from './style';
import axios from 'axios';
const back = require('../images/bg.jpg');
const logos = require('../images/picture.png');

const Singin = ({navigation}) => (
  <ImageBackground source={back} style={Styles.container}>
    <ScrollView style={Styles.view}>
      <View style={Styles.layout}>
        <Image source={logos} style={Styles.logos} />
        <Text style={Styles.title}>Dbr</Text>
        <Text style={Styles.title2}>Money Transfert</Text>
        <Text>S'inscrire</Text>
        <View style={Styles.boxlogin}>
          <TextInput style={Styles.input} placeholder="Noms" />
          <View style={Styles.inputPhone}>
            <Text>+243 </Text>
            <TextInput placeholder="Téléphone" keyboardType="numeric" />
          </View>
          <TextInput style={Styles.input} placeholder="Email" />
          <TextInput style={Styles.input} placeholder="Adresse" />
          <TouchableOpacity onPress={() => {}}>
            <Text>condition d'utlisation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={Styles.buttonAcceder}>
            <Text style={Styles.buttonTitle}>J'ACCEPTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
);

export default Singin;
