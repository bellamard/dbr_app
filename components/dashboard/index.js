import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import Styles from './style';
import axios from 'axios';
const user = require('../../images/user.jpg');

const Dashboard = ({navigation}) => {
  const [solde, setsolde] = useState(0.0);
  return (
    <View style={Styles.container}>
      <View style={Styles.boxUser}>
        <Image source={user} style={Styles.userLogos} />
        <View>
          <Text style={Styles.userName}>dashboard</Text>
          <Text style={Styles.userPhone}>dashboard</Text>
        </View>
      </View>
      <View style={Styles.layout}>
        <View style={Styles.layoutSold}>
          <View style={Styles.boxSold}>
            <View>
              <TouchableOpacity>
                <Text>CDF</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>USD</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>SOLDE:</Text>
              <Text>{solde}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
