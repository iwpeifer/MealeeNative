import React from 'react';
import { Text, View, Slider, Button } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class LimitForm extends React.Component {
  constructor() {
    super();
    this.state = {
      limit: "20",
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>How many rounds would you like to play?</Text>
        <View style={Styles.sliderContainer}>
          <Text>{this.state.limit}</Text>
          <Slider
            style={Styles.slider}
            step={10}
            value={parseInt(this.state.limit)}
            minimumValue={10}
            maximumValue={40}
            onValueChange={(value) => this.setState({limit: value})}
            thumbImage={require('../images/smileyface4.png')}
          />
        </View>
        {this.displayNextButton()}
        {this.props.displayGoBackButton('priceMin')}
      </View>
    );
  }
}
