import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

import LocationForm from './components/LocationForm';
import SearchTermForm from './components/SearchTermForm';
import PriceForm from './components/PriceForm';
import LimitForm from './components/LimitForm';
import PlayScreen from './components/PlayScreen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      searchTerm: "",
      priceMin: "",
      priceMax: "",
      businessPool: [],
      gameIsLoading: false,
      gameHasStarted:false,
      challenger: '',
      defender: '',
    }
    this.storeInput = this.storeInput.bind(this);
    this.goBack = this.goBack.bind(this);
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this);
    this.displayGoBackButton = this.displayGoBackButton.bind(this);
  }

  retrieveBusinesses() {
    let location = this.state.location;
    let term = this.state.searchTerm;
    let price = this.formatPrice(this.state.priceMin, this.state.priceMax);
    let limit = '20';
    this.setState({
      gameIsLoading: true
    });
    return fetch(`https://mealee-api.herokuapp.com/retrieve/?term=${term}&location=${location}&limit=${limit}&price=${price}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      this.setState({
        businessPool: json.businesses.map(business => business)
      });
    })
    .then(response => {
      if (this.state.businessPool.length >= 2) {
        this.initialDrawing();
      } else {
        alert ("ALERT1 No businesses found; try altering the location and/or search term.");
        this.setState({
          gameIsLoading: false,
          defender: '',
          challenger: ''
        });
      }
    })
    .catch( response => {
      console.log(this.state.businessPool)
      alert("ALERT2 No businesses found; try altering the location and/or search term.");
      this.setState({
        gameIsLoading: false
      });
    });
  }

  initialDrawing() {
    let drawingOne = Math.floor(Math.random() * (this.state.businessPool.length))
    let drawingTwo
    while (!drawingTwo || drawingTwo === drawingOne) {
      drawingTwo = Math.floor(Math.random() * (this.state.businessPool.length))
    }
    this.setState({
      businessPool: this.state.businessPool.filter((business, index) => index !== drawingOne && index !== drawingTwo),
      defender: Object.assign({}, this.state.businessPool[drawingOne]),
      challenger: Object.assign({}, this.state.businessPool[drawingTwo]),
      gameHasStarted: true,
      gameIsLoading: false
    })
  }

  formatPrice(priceMin, priceMax) {
    let lowInt = parseInt(priceMin);
    let highInt = parseInt(priceMax);
    return (Array.from({length:highInt - lowInt + 1}, (v,k) => k + lowInt)).join();
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
    if (this.state.gameIsLoading) {
      return (
        <ActivityIndicator color={'blue'} size={'large'} />
      );
    }
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
          displayNextButton  ={this.displayNextButton}
          displayGoBackButton={this.displayGoBackButton}
        />
      );
    }
    if (this.state.priceMin && this.state.priceMax) {
      return (
        <PlayScreen
          retrieveBusinesses ={this.retrieveBusinesses}
          displayGoBackButton={this.displayGoBackButton}
        />
      )
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <Text>{this.state.gameIsLoading}</Text>
        {this.state.challenger.name ? <Text>{this.state.challenger.name}</Text> : null}
        {this.state.defender.name ? <Text>{this.state.defender.name}</Text> : null}
        {this.renderForms()}
      </View>
    );
  }
}
