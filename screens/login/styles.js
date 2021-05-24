import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F3F2DC',
  },
  textInput: {
    width: '85%',
    height: 40,
    backgroundColor: '#FAF9F0',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 36,
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#438E92',
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
    padding: 10,
    width: '85%',
  },
  register: {
    marginTop: 80,
    flexDirection: 'row',
  },
  textRegister: {
    fontWeight: 'bold',
  },
});
