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
    padding: 5,
    alignItems: 'center',
  },
  userLogos: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    color: '#0ff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  userPhone: {
    color: '#fff',
  },
  body: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 1,
    borderColor: '#0ff',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  itemNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00f',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemArticle: {
    borderColor: '#00f',
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3399FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'blue',
    marginVertical: 10,
  },
  buttonAnnuler: {
    backgroundColor: '#f44',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'blue',
  },
});
export default Styles;
