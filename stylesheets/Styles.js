import React from 'react';
import { StyleSheet } from 'react-native';

const GREEN = '#87c540';
const WHITE = '#fff';
const RED =  '#D32323'
const BRICK = '#930d00'
const CHARCOAL = '#36454f'

export default Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  input: {
    color: CHARCOAL,
    height: 40,
    width: 250,
    backgroundColor: WHITE,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    height: 40,
    width: 250,
    backgroundColor: GREEN,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  nextButton: {
    height: 40,
    width: 100,
    backgroundColor: GREEN,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  emojiBox: {
    backgroundColor: BRICK,
    borderRadius: 10,
    overflow:'hidden',
  },
  play: {
    height: 40,
    width: 175,
    backgroundColor: GREEN,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  reset: {
    height: 40,
    width: 100,
    backgroundColor: BRICK,
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
  },
  optionCard: {
    backgroundColor: '#fff',
    margin: 5,
    height: 250, width: 275,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
