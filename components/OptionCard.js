import React from 'react';
import { Text, View, Button, Image } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class OptionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.business);
    return (
      <View style={{height: 300, width: 300, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{this.props.business.name}</Text>
        <Image
          style={{height: 175, width: 250}}
          source={{uri: this.props.business.image_url}}
        />
      </View>
    );
  }
}
