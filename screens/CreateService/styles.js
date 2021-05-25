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
  iconWalk: {
    marginTop: 70,
    marginBottom: 50,
    paddingBottom: 10,
  },
  viewDate: {
    width: '100%',
    flexDirection: 'row',
    marginLeft: 25,
    justifyContent: 'center',
  },
  iconDate: {
    position: 'relative',
    right: 50,
    top: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#438E92',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    width: '85%',
  },
});
