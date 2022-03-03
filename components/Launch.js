import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Styles from './style';
const back = require('../images/bg.jpg');
const logos = require('../images/picture.png');
const Launch = ({navigation}) => {
  return (
    <ImageBackground source={back} style={Styles.container}>
      <View style={Styles.layout}>
        <Image source={logos} style={Styles.logos} />
        <Text style={Styles.title}>Dbr</Text>
        <Text style={Styles.title2}>Money Transfert</Text>
        <View>
          <Text style={Styles.paragraph}>
            La convergence n’est pas la divergence, la cosmogonisation. C’est à
            dire quand on parle de ces rollers, mais oui avéré(e)(s). Comme la
            coumbacérie ou le script de Aze, merci propre(s) aux congolais.
            Quand on parle de relaxation, Bonne Année dans les camps militaires
            non-voyants.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push('Login');
            }}
            style={Styles.buttonAcceder}>
            <Text style={Styles.buttonTitle}>ACCEDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Launch;
