import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    alignItems: 'center',
  },
  textInput: {
    width: '85%',
    height: 40,
    backgroundColor: '#FAF9F0',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 16,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 25,
    marginBottom: 25,
    borderRadius: 100,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  iconEdit: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  iconCamera: {
    position: 'absolute',
    top: 110,
  },
  editPhoto: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginTop: 25,
    borderRadius: 100,
    backgroundColor: 'rgba(250,249,240, 0.6)',
  },
  buttonLogOut: {
    position: 'absolute',
    backgroundColor: '#FC1B3A',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
    bottom: 50,
  },
  buttonSave: {
    backgroundColor: '#438E92',
    marginTop: 5,
    marginRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: '#FC1B3A',
    marginTop: 5,
    marginLeft: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
  },
});
