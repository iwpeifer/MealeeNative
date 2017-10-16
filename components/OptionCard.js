import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, Button, ActivityIndicator, Linking } from 'react-native';

import Styles from '../stylesheets/Styles';

export default class OptionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIsLoading: 'false',
    };
  }

  defineColor() {
    if (
      this.props.business.rating > this.props.opponent.rating
        && this.props.business.review_count >= this.props.opponent.review_count / 2
    ) {
      return '#3a8c3d';
    }
    if (
      this.props.business.rating === this.props.opponent.rating
        && this.props.business.review_count > this.props.opponent.review_count
    ) {
      return '#3a8c3d';
    }
  }

  displayReviewInfo() {
    const color = this.defineColor();
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>Rated </Text>
        <Text style={{ fontWeight: 'bold', color }}>{this.props.business.rating} </Text>
        <Text>out of {this.props.business.review_count} reviews </Text>
        {this.displayPrice()}
      </View>
    );
  }

  displayWalkTime() {
    const walkTime = Math.round(this.props.business.distance / 70);
    let color = '#000';
    if (this.props.business.distance < this.props.opponent.distance) {
      color = '#3a8c3d';
    }
    if (walkTime > 60) {
      return <Text style={{ color, fontWeight: 'bold' }}> ({Math.round((walkTime / 60) * 100) / 100} hour walk)</Text>;
    }
    return <Text style={{ color, fontWeight: 'bold' }}> ({walkTime} minute walk)</Text>;
  }


  displayPrice() {
    if (this.props.business.price) {
      const splitPrice = this.props.business.price.split('');
      const newSplitPrice = splitPrice.map(() => '💰');
      return <Text>{newSplitPrice.join('')}</Text>;
    }
  }

  displayAddress() {
    if (this.props.business.location) {
      if (this.props.business.location.address1) {
        return <Text>{this.props.business.location.address1}</Text>;
      } else if (this.props.business.location.city) {
        return <Text>{this.props.business.location.city}</Text>;
      }
    }
  }

  displayIdRatherGoHereButton(props) {
    let title = '👍';
    let onPress = () => props.removeOption(props.which);
    if (!props.opponent) {
      title = 'GO HERE!';
      onPress = () => Linking.openURL(props.business.url).catch(err => alert('An error occurred', err));
    }
    return (
      <Button
        color="#87c540"
        title={title}
        accessibilityLabel={title}
        onPress={() => onPress()}
      />
    );
  }

  displayImage() {
    let imageURL = 'https://media1.giphy.com/media/PIbPrnuEpGEla/200.webp#26-grid1';
    if (this.props.business.image_url) {
      imageURL = this.props.business.image_url;
    }
    return (
      <View>
        <Image
          onLoadStart={() => this.setState({ imageIsLoading: true })}
          onLoadEnd={() => this.setState({ imageIsLoading: false })}
          style={{ height: 150, width: 250 }}
          source={{ uri: imageURL }}
          resizeMode="contain"
        />
      </View>
    );
  }

  displayResetButton() {
    return (
      <Button
        color="#fff"
        title="Start Over"
        accessibilityLabel="start over"
        onPress={() => this.props.reset()}
      />
    );
  }

  render() {
    return (
      <View>
        <View style={Styles.optionCard}>
          <Text style={{ fontWeight: 'bold' }}>{this.props.business.name}</Text>
          {this.displayImage()}
          <View style={{ position: 'absolute' }}>
            {this.state.imageIsLoading ?
              <ActivityIndicator size="large" color="#fff" style={{ paddingBottom: 40 }} />
              : null}
          </View>
          {this.displayReviewInfo()}
          <View style={{ flexDirection: 'row' }}>
            {this.displayAddress()}
            {this.displayWalkTime()}
          </View>
          {this.displayIdRatherGoHereButton(this.props)}
        </View>
        {!this.props.opponent ? this.displayResetButton() : null}
      </View>
    );
  }
}

OptionCard.propTypes = {
  business: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.object,
    rating: PropTypes.number,
    review_count: PropTypes.number,
    distance: PropTypes.number,
    price: PropTypes.string,
    image_url: PropTypes.string,
  }),
  opponent: PropTypes.oneOfType([
    PropTypes.shape({
      rating: PropTypes.number,
      review_count: PropTypes.number,
      distance: PropTypes.number,
      price: PropTypes.string,
    }),
    PropTypes.string]),
  reset: PropTypes.func.isRequired,
};
