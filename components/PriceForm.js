import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, Slider } from 'react-native';

import Styles from '../stylesheets/Styles';

const moneyBag = require('../images/moneybag.png');

export default class PriceForm extends React.Component {
  constructor() {
    super();
    this.state = {
      priceMin: '1',
      priceMax: '4',
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.priceMin > this.state.priceMax) {
      this.setState({
        priceMax: nextState.priceMin,
      });
    }
    if (nextState.priceMax < this.state.priceMin) {
      this.setState({
        priceMin: nextState.priceMax,
      });
    }
  }

  render() {
    const priceMinSymbol = '$'.repeat(this.state.priceMin);
    const priceMaxSymbol = '$'.repeat(this.state.priceMax);
    return (
      <View style={{ height: 200, alignItems: 'center' }}>
        <Text style={Styles.text}>Adjust your price range:</Text>
        <View style={Styles.sliderContainer}>
          <Text style={Styles.text}>Min: {priceMinSymbol}</Text>
          <Slider
            style={Styles.slider}
            minimumTrackTintColor="#87c540"
            step={1}
            value={parseInt(this.state.priceMin, 10)}
            minimumValue={1}
            maximumValue={4}
            onValueChange={value => this.setState({ priceMin: value })}
            thumbImage={moneyBag}
          />
        </View>
        <View style={Styles.sliderContainer}>
          <Text style={Styles.text}>Max: {priceMaxSymbol}</Text>
          <Slider
            style={Styles.slider}
            minimumTrackTintColor="#87c540"
            step={1}
            value={parseInt(this.state.priceMax, 10)}
            minimumValue={1}
            maximumValue={4}
            onValueChange={value => this.setState({ priceMax: value })}
            thumbImage={moneyBag}
          />
        </View>
        {this.props.displayNextButton('priceMin', this.state.priceMin, 'priceMax', this.state.priceMax)}
        {this.props.displayGoBackButton('searchTerm')}
      </View>
    );
  }
}

PriceForm.propTypes = {
  displayNextButton: PropTypes.func.isRequired,
  displayGoBackButton: PropTypes.func.isRequired,
};
