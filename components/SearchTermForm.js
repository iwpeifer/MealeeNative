import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TextInput, Button } from 'react-native';

import Styles from '../stylesheets/Styles';

export default class SearchTermForm extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  renderQuickButtons() {
    const buttonSets = [
      [{ breakfast: '🥞' }, { dinner: '🍽️' }, { hamburgers: '🍔' }, { pizza: '🍕' }, { sushi: '🍣' }, { vegetarian: '🥗' }, { vietnamese: '🍲' }],
      [{ mexican: '🌮' }, { indian: '🍛' }, { coffee: '☕' }, { bar: '🍺' }, { bakery: '🥐' }, { dessert: '🍨' }, { clothes: '🛍️' }],
    ];
    return (
      <View style={{
 height: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
}}
      >
        {buttonSets.map(buttonSet => (
          <View
            key={String(Object.keys(buttonSet[0]))}
            style={{
flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
}}
          >
            {buttonSet.map(button => (
              <Button
                title={String(Object.values(button))}
                onPress={() => this.setState({ searchTerm: String(Object.keys(button)) })}
                key={String(Object.keys(button))}
              />
                ))}
          </View>
          ))}
      </View>
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.text}>What are you looking for?</Text>
        <TextInput
          style={Styles.input}
          value={this.state.searchTerm}
          placeholder="e.g., Lunch, Pizza, Shoes"
          onChangeText={searchTerm => this.setState({ searchTerm })}
        />
        <View style={Styles.emojiBox}>
          {this.renderQuickButtons()}
        </View>
        {this.state.searchTerm ? this.props.displayNextButton('searchTerm', this.state.searchTerm) : null}
        {this.props.displayGoBackButton('location')}
      </View>
    );
  }
}

SearchTermForm.propTypes = {
  displayNextButton: PropTypes.func.isRequired,
  displayGoBackButton: PropTypes.func.isRequired,
};
