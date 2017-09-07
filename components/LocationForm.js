import React from 'react';
import { Text, View, TextInput, Button, ActivityIndicator } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      searchingLocation: false,
    }
  }

  getAddress(lat, long) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyB80MQ7VcG-FH3q_VIjvG-6SZG52lqKNok`
    fetch(url)
      .then( response => response.json() )
      .then( json => this.setState({
        location: json.results[0].formatted_address,
        searchingLocation: false
      }))
    }

  getLocation() {
    this.setState({
      searchingLocation: true
    })
    window.navigator.geolocation.getCurrentPosition( pos => {
      this.getAddress(pos.coords.latitude, pos.coords.longitude)
    }, this.locationError)
  }

  locationError(error) {
    alert(`ERROR(${error.code}): ${error.message}`)
    this.setState({
      searchingLocation: false,
      location: ""
    })
  }

  displayLocationForm() {
    if (this.state.searchingLocation) {
      return (
        <ActivityIndicator color={'blue'} size={'large'} style={{margin: 10}}/>
      )
    } else{
      return (
        <TextInput
          style       ={Styles.input}
          value       ={this.state.location}
          onChangeText={(location) => this.setState({location})}>
        </TextInput>
      )
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.button}>
          <Button
            onPress={() => this.getLocation()}
            title  ={"Get Current Location"}
            color  ={'#fff'}
            accessibilityLabel={"Get Current Location"}
          />
        </View>
        <Text>or enter a location:</Text>
        {this.displayLocationForm()}
        {this.state.location ? this.props.displayNextButton('location', this.state.location) : null}
      </View>
    );
  }
}
