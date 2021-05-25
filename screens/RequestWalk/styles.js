import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
    fontSize: 12,
  },
  infoWalker: {
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
    marginRight: 20,
    marginLeft: 10,
  },
  options: {
    flex: 3,
    justifyContent: 'center',
    paddingRight: 3,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 150,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#438E92',
    borderRadius: 10,
    marginTop: 10,
    padding: 8,
    width: '85%',
  },
  text: {
    marginTop: 5,
    marginLeft: 10
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
