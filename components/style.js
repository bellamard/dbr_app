import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const Styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    backgroundColor: '#fff',
    width: width - width / 8,
    height: height - width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
  },
  logos: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  title2: {
    fontSize: 28,
  },
  paragraph: {
    textAlign: 'center',
  },
  buttonAcceder: {
    backgroundColor: '#3399FF',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'blue',
  },
  buttonTitle: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#3399FF',
    borderBottomWidth: 1,
  },
  inputPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderColor: '#3399FF',
    borderBottomWidth: 1,
  },
  boxlogin: {
    padding: 20,
    width: '100%',
  },
  error: {
    color: 'red',
  },
  view: {
    marginTop: height - height / 1.15,
  },
});
export default Styles;
