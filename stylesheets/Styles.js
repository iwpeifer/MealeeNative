import React from 'react';
import { StyleSheet} from 'react-native';

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 10,
    height: 40,
    width: 250,
    borderColor: '#99ccff',
    borderWidth: 1,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    height: 40,
    width: 250,
    backgroundColor: '#99ccff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  next: {
    height: 40,
    width: 100,
    backgroundColor: '#99ccff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  reset: {
    height: 40,
    width: 100,
    backgroundColor: '#ff9b9b',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  slider: {
    width: 200,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
