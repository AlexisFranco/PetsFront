import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
  },
  infoService: {
    flex: 1,
    width: '95%',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingTop: 25,
    paddingLeft: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    borderColor: '#438E92',
    backgroundColor: '#FAF9F0',
  },
  infoColumn: {
    flex:1,
    flexDirection: 'column',
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 40,
  },
  text: {
    marginLeft: 10,
  },
});
