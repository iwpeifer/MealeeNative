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

  submit() {
    this.props.storeInput('searchTerm', this.state.searchTerm)
  }

  displayNextButton() {
    return (
      <View style={Styles.next}>
        <Button
          onPress={() => this.submit()}
          title={"NEXT"}
          color={'#fff'}
          accessibilityLabel={"Next"}
        />
      </View>
    )
  }

  displayGoBackButton() {
    return (
      <View>
        <Button
          onPress={() => this.props.goBack('location')}
          title={"Back"}
          color={'#ff9b9b'}
          accessibilityLabel={"go back"}
        />
      </View>
    );
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
        {this.state.searchTerm ? this.displayNextButton() : null}
        {this.props.displayGoBackButton('location')}
      </View>
    );
  }
}
