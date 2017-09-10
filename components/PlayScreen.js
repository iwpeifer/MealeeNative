import React from 'react';
import { Text, View, Button } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  displayPlayButton(limitSet, index) {
    return (
      <View key={index}>
        <View style={Styles.play}>
          <Button
            onPress={() => this.props.retrieveBusinesses(Object.values(limitSet))}
            title={`Play ${Object.values(limitSet)} rounds! ${Object.keys(limitSet)}`}
            color={'#fff'}
            accessibilityLabel={`Play ${Object.values(limitSet)} rounds!`}
          />
        </View>
      </View>
    );
  }

  render() {
    let limitArray = [{'🙂': '10'}, {'😀': '20'}, {'😆': '30'}, {'😨': '40'}];
    return (
      <View style={{height: 300, alignItems: 'center'}}>
        {limitArray.map((limitSet, index) => this.displayPlayButton(limitSet, index))}
        {this.props.displayGoBackButton('priceMin')}
      </View>
    );
  }
}
