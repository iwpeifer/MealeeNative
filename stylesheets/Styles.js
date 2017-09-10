import React from 'react';
import { StyleSheet } from 'react-native';

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: '#b04632',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#f5ea92',
  },
  input: {
    borderRadius: 10,
    height: 40,
    width: 250,
    borderColor: '#87c540',
    borderWidth: 1,
    backgroundColor: '#fbffe0',
    textAlign: 'center',
    margin: 10,
  },
  button: {
    height: 40,
    width: 250,
    backgroundColor: '#87c540',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  next: {
    height: 40,
    width: 100,
    backgroundColor: '#87c540',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  reset: {
    height: 40,
    width: 100,
    backgroundColor: '#7a3020',
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
