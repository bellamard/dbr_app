import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    width: width,
    height: height,
    flex: 1,
    backgroundColor: '#519',
  },
  boxUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLogos: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#99F',
    marginHorizontal: 2,
  },
  userName: {
    color: '#99f',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userPhone: {
    color: '#99f',
    fontSize: 16,
  },
  layout: {
    flex: 1,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#fff',
    padding: 20,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  layoutSold: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#519',
  },
  boxSold: {
    flexDirection: 'row',
  },
});
export default Styles;
