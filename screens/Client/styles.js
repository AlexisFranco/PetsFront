import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
  },
  onePet: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(250,249,240, 0.8)',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  infoPet: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  options: {
    flex: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
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
