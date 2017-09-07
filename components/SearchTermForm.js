import React from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class SearchTermForm extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
    }
  }

  renderQuickButtons() {
    let buttonSets = [
      [{breakfast: '🥞'}, {dinner: '🍽️'}, {hamburgers: '🍔'}, {pizza: '🍕'}, {sushi: '🍣'}, {vegetarian: '🥗'}],
      [{coffee: '☕'}, {bar:  '🍺'}, {bakery: '🥐'}, {mexican: '🌮'}, {dessert: '🍨'}, {clothes: '🛍️'}],
    ];
    return (
      <View style={{height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {buttonSets.map((buttonSet, index) => {
          return (
            <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              {buttonSet.map((button, index) => {
                return (
                  <Button
                    title={String(Object.values(button))}
                    onPress={() => this.setState({searchTerm: String(Object.keys(button))})}
                    key={index}
                  />
                )}
              )}
            </View>
          )
        })}
      </View>
    )
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
        {this.renderQuickButtons()}
        {this.state.searchTerm ? this.props.displayNextButton('searchTerm', this.state.searchTerm) : null}
        {this.props.displayGoBackButton('location')}
      </View>
    );
  }
}
