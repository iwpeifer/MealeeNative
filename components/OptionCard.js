import React from 'react';
import { Text, View, Button, Image, ActivityIndicator } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class OptionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.business);
    let business = this.props.business;
    if (!business.image_url) {
      business.image_url = 'https://media1.giphy.com/media/PIbPrnuEpGEla/200.webp#26-grid1'
    }
    return (
      <View style={{margin: 5, borderRadius: 10, borderWidth: 1, borderColor: '#b04632', height: 250, width: 300, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{business.name}</Text>
        <Image
          onProgress={() => <ActivityIndicator size={'large'} color={'#b04632'}/>}
          style={{height: 150, width: 250}}
          source={{uri: business.image_url}}
        />
        <Text>{business.price}</Text>
        <Button
          color={'#87c540'}
          title={"I'd rather go here!"}
          accessibilityLabel={"I'd rather go here!"}
          onPress={() => this.props.removeOption(this.props.which)}
        />
      </View>
    );
  }
}
