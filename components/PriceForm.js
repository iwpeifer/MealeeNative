import React from 'react';
import { Text, View, Slider, Button } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class PriceForm extends React.Component {
  constructor() {
    super();
    this.state = {
      priceMin: '1',
      priceMax: '4',
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.priceMin > this.state.priceMax) {
      this.setState({
        priceMax: nextState.priceMin
      })
    }
    if (nextState.priceMax < this.state.priceMin) {
      this.setState({
        priceMin: nextState.priceMax
      })
    }
  }

  render() {
    let priceMinSymbol = '$'.repeat(this.state.priceMin);
    let priceMaxSymbol = '$'.repeat(this.state.priceMax);
    return (
      <View style={{height: 200, alignItems: 'center'}}>
        <Text>Adjust your price range:</Text>
        <View style={Styles.sliderContainer}>
          <Text>Min: {priceMinSymbol} {this.state.priceMin}</Text>
          <Slider
            style={Styles.slider}
            minimumTrackTintColor={'#b04632'}
            step={1}
            value={parseInt(this.state.priceMin)}
            minimumValue={1}
            maximumValue={4}
            onValueChange={(value) => this.setState({priceMin: value})}
            thumbImage={require('../images/moneybag.png')}
          />
        </View>
        <View style={Styles.sliderContainer}>
          <Text>Max: {priceMaxSymbol} {this.state.priceMax}</Text>
          <Slider
            style={Styles.slider}
            minimumTrackTintColor={'#b04632'}
            step={1}
            value={parseInt(this.state.priceMax)}
            minimumValue={1}
            maximumValue={4}
            onValueChange={(value) => this.setState({priceMax: value})}
            thumbImage={require('../images/moneybag.png')}
          />
        </View>
        {this.props.displayNextButton('priceMin', this.state.priceMin, 'priceMax', this.state.priceMax)}
        {this.props.displayGoBackButton('searchTerm')}
      </View>
    );
  }
}
