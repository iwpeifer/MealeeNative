import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import LocationForm from './components/LocationForm';
import SearchTermForm from './components/SearchTermForm';
import PriceForm from './components/PriceForm';
import LimitForm from './components/LimitForm';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      searchTerm: "",
      priceMin: "",
      priceMax: "",
    }
    this.storeInput = this.storeInput.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  storeInput(inputType, input, inputType2, input2) {
    this.setState({
      [inputType]: input
    });
    if (inputType2) {
      this.setState({
        [inputType2]: input2
      });
    }
  }

  displayNextButton(inputType, input, inputType2=null, input2=null) {
    return (
      <View style={Styles.next}>
        <Button
          onPress={() => this.storeInput(inputType, input, inputType2, input2)}
          title={"NEXT"}
          color={'#fff'}
          accessibilityLabel={"Next"}
        />
      </View>
    );
  }

  goBack(inputType) {
    this.setState({
      [inputType]: ""
    });
  }

  displayGoBackButton(inputType) {
    return (
      <View>
        <Button
          onPress={() => this.goBack(inputType)}
          title={"Back"}
          color={'#ff9b9b'}
          accessibilityLabel={"go back"}
        />
      </View>
    );
  }

  renderForms() {
    if (!this.state.location) {
      return (
        <LocationForm
          storeInput        ={this.storeInput}
          displayNextButton={this.displayNextButton}
        />
      );
    }
    if (this.state.location && !this.state.searchTerm) {
      return (
        <SearchTermForm
          storeInput         ={this.storeInput}
          goBack             ={this.goBack}
          displayNextButton={this.displayNextButton}
          displayGoBackButton={this.displayGoBackButton}
        />
      );
    }
    if (this.state.searchTerm && !this.state.priceMin) {
      return (
        <PriceForm
          storeInput         ={this.storeInput}
          goBack             ={this.goBack}
          displayNextButton={this.displayNextButton}
          displayGoBackButton={this.displayGoBackButton}
        />
      );
    }
    // if (this.state.priceMin && !this.state.limit) {
    //   return (
    //     <LimitForm
    //       storeInput         ={this.storeInput}
    //       goBack             ={this.goBack}
    //       displayGoBackButton={this.displayGoBackButton}
    //     />
    //   );
    // }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>{this.state.location}</Text>
        <Text>{this.state.searchTerm}</Text>
        <Text>{this.state.priceMin}</Text>
        <Text>{this.state.priceMax}</Text>
        {this.renderForms()}
      </View>
    );
  }
}
