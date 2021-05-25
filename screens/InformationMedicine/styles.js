import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
    fontSize: 12,
  },
  infoMedicine: {
    flex: 1,
    width: '95%',
    marginTop: 15,
    marginLeft: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 20,
    borderColor: '#438E92',
    backgroundColor: '#FAF9F0',
    flexDirection: 'row',
  },
  info: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 30,
  },
  options: {
    flex: 3,
    justifyContent: 'center',
    paddingRight: 3,
    marginLeft: 20,
  },
  textInfoMed: {
    marginTop: 10,
  },
  textOptions: {
    marginTop: 5,
    marginLeft: 15,
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  plus: {
    backgroundColor: '#85C7B5',
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    position: 'absolute',
    bottom: 40,
    right: 15,
  },
});
