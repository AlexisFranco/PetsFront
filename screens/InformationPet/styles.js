import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 50,
    marginBottom: 25,
    borderRadius: 150,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  iconCamera: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    marginLeft: 15,
  },
});
