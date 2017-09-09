import React from 'react';
import { Text, View, Button, Image, ActivityIndicator, WebView, Linking } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class OptionCard extends React.Component {
  constructor(props) {
    super(props);
  }

  defineColor() {
    if (this.props.business.rating > this.props.opponent.rating && this.props.business.review_count >= this.props.opponent.review_count / 2) {
      return '#49a74c'
    }
    if (this.props.business.rating === this.props.opponent.rating && this.props.business.review_count > this.props.opponent.review_count) {
      return '#49a74c'
    }
  }

  displayReviewInfo() {
    let color = this.defineColor();
    return (
      <View style={{flexDirection: 'row'}}>
        <Text>Rated </Text>
        <Text style={{fontWeight: 'bold', color: color}}>{this.props.business.rating} </Text>
        <Text>out of {this.props.business.review_count} reviews </Text>
        {this.displayPrice()}
      </View>
    );
  }

  displayWalkTime() {
    let walkTime = Math.round(this.props.business.distance / 70)
    let color = '#000'
    if (this.props.business.distance < this.props.opponent.distance) {
      color = '#49a74c'
    }
    if (walkTime > 60) {
      return <Text style={{color: color, fontWeight: 'bold'}}> ({Math.round((walkTime / 60) * 100) / 100} hour walk)</Text>
    } else {
      return <Text style={{color: color, fontWeight: 'bold'}}> ({walkTime} minute walk)</Text>
    }
  }


  displayPrice() {
    if (this.props.business.price) {
      let splitPrice = this.props.business.price.split('')
      let newSplitPrice = splitPrice.map(dollarSign => '💰')
      return <Text>{newSplitPrice.join('')}</Text>
    }
  }

  displayAddress() {
    if (this.props.business.location) {
      if (this.props.business.location.address1) {
        return <Text>{this.props.business.location.address1}</Text>
      } else if (this.props.business.location.city) {
        return <Text>{this.props.business.location.city}</Text>
      }
    }
  }

  displayIdRatherGoHereButton(props) {
    let title = "I'd rather go here!";
    let color = '#49a74c';
    let onPress = () => props.removeOption(props.which);
    if (!props.opponent) {
      title = "Go here!";
      color = '#b04632';
      onPress = () => Linking.openURL(props.business.url).catch(err => console.log('An error occurred', err));
    }
    return (
      <Button
        color={color}
        title={title}
        accessibilityLabel={title}
        onPress={() => onPress()}
      />
    );
  }

  displayImage() {
    let image_url = 'https://media1.giphy.com/media/PIbPrnuEpGEla/200.webp#26-grid1';
    if (this.props.business.image_url) {
      image_url = this.props.business.image_url;
    }
    return (
      <View style={{borderRadius: 10}}>
        <Image
          style={{height: 150, width: 250, borderRadius: 10, borderWidth: 1, borderColor: '#b04632'}}
          source={{uri: image_url}}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{margin: 5, borderWidth: 2, borderRadius: 10, borderColor: '#b04632', height: 240, width: 300, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>{this.props.business.name}</Text>
        {this.displayImage()}
        {this.displayReviewInfo()}
        <View style={{flexDirection: 'row'}}>
          {this.displayAddress()}
          {this.displayWalkTime()}
        </View>
        {this.displayIdRatherGoHereButton(this.props)}
      </View>
    );
  }
}
