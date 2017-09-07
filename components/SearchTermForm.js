import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class SearchTermForm extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>What are you looking for?</Text>
        <TextInput
          style       ={Styles.input}
          value       ={this.state.searchTerm}
          placeholder ={'e.g., Lunch, Pizza, Shoes'}
          onChangeText={(searchTerm) => this.setState({searchTerm})}>
        </TextInput>
        {this.state.searchTerm ? this.props.displayNextButton('searchTerm', this.state.searchTerm) : null}
        {this.props.displayGoBackButton('location')}
      </View>
    );
  }
}
