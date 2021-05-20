import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ECEAD2',
    justifyContent: 'center',
  },
  textInput: {
    width: '85%',
    height: 40,
    borderColor: '#D4E3E7',
    borderBottomWidth: 1,
    marginBottom: 36,
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#438E92',
    marginTop: 20,
    padding: 10,
    width: '85%',
  },
  register: {
    marginTop: 100,
    flexDirection: 'row',
  },
  textRegister: {
    fontWeight: 'bold',
  },
});
