import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
  },
  infoService: {
    flex: 1,
    width: '95%',
    backgroundColor: '#FAF9F0',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
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
    marginRight: 40,
    marginLeft: 10,
  },
  options: {
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
  },
  text: {
    marginLeft: 10,
  },
  textPet: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonProcess: {
    backgroundColor: '#438E92',
    marginTop: 5,
    marginRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: '#FC1B3A',
    marginTop: 5,
    marginLeft: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  textButton: {
    color: '#FAF9F0',
    fontWeight: 'bold',
  },
});
