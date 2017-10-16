import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';

import Styles from '../stylesheets/Styles';

export default class PlayScreen extends React.Component {
  displayPlayButton(limitSet, index) {
    return (
      <View key={index}>
        <View style={Styles.play}>
          <Button
            onPress={() => this.props.retrieveBusinesses(Object.values(limitSet))}
            title={`Play ${Object.values(limitSet)} rounds! ${Object.keys(limitSet)}`}
            color="#fff"
            accessibilityLabel={`Play ${Object.values(limitSet)} rounds!`}
          />
        </View>
      </View>
    );
  }

  render() {
    const limitArray = [{ '🙂': '10' }, { '😀': '20' }, { '😆': '30' }, { '😨': '40' }];
    return (
      <View style={{ height: 300, alignItems: 'center' }}>
        {limitArray.map((limitSet, index) => this.displayPlayButton(limitSet, index))}
        {this.props.displayGoBackButton('priceMin')}
      </View>
    );
  }
}

PlayScreen.propTypes = {
  retrieveBusinesses: PropTypes.func.isRequired,
  displayGoBackButton: PropTypes.func.isRequired,
};
