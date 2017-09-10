import React from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, Image, Dimensions } from 'react-native';

import LocationForm from './components/LocationForm';
import SearchTermForm from './components/SearchTermForm';
import PriceForm from './components/PriceForm';
import LimitForm from './components/LimitForm';
import PlayScreen from './components/PlayScreen';
import OptionCard from './components/OptionCard';

import Orientation from './utilities/Orientation';

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
      orientation: Orientation.isPortrait() ? 'column' : 'row',
    }
    Dimensions.addEventListener('change', () => {
      this.setState({
          orientation: Orientation.isPortrait() ? 'column' : 'row'
      });
    });
    this.storeInput = this.storeInput.bind(this);
    this.goBack = this.goBack.bind(this);
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this);
    this.displayGoBackButton = this.displayGoBackButton.bind(this);
    this.retrieveBusinesses = this.retrieveBusinesses.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.reset = this.reset.bind(this);
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
        alert ("No businesses found; try altering the location and/or search term.");
        this.setState({
          gameIsLoading: false,
          defender: '',
          challenger: ''
        });
      }
    })
    .catch( response => {
      console.log(this.state.businessPool)
      alert("No businesses found; try altering the location and/or search term.");
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

  removeOption(which) {
    if (this.state.businessPool.length >= 1) {
      let drawing = Math.floor(Math.random() * (this.state.businessPool.length))
      this.setState({
        businessPool: this.state.businessPool.filter((business, index) => index !== drawing),
        [which]: Object.assign({}, this.state.businessPool[drawing])
      })
    } else {
      this.setState({
        [which]: ''
      })
    }
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
          color={'#7a3020'}
          accessibilityLabel={"go back"}
        />
      </View>
    );
  }

  reset() {
    this.setState({
      location: "",
      searchTerm: "",
      priceMin: "",
      priceMax: "",
      businessPool: [],
      gameIsLoading: false,
      gameHasStarted:false,
      challenger: '',
      defender: '',
    });
  }

  renderForms() {
    if (!this.state.gameHasStarted) {
      if (!this.state.challenger || !this.state.defender) {
        if (this.state.gameIsLoading) {
          return (
            <ActivityIndicator color={'#fbffe0'} size={'large'} />
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
              displayNextButton  ={this.displayNextButton}
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
          );
        }
      }
    }
  }

  displayLogo() {
    return (
      <Image
        resizeMode={'contain'}
        style={{width: 300}}
        source={require('./images/MealeeLogo.png')}
      />
    );
  }

  render() {
    return (
      <View flexDirection={this.state.orientation} style={{backgroundColor: '#b04632', height:600, flex: 1, alignItems: 'center', justifyContent: 'center'}}>

          {this.state.location ? null : this.displayLogo()}
          {this.state.challenger ? <OptionCard business={this.state.challenger} removeOption={this.removeOption} opponent={this.state.defender} which={'defender'} businessPool={this.state.businessPool} reset={this.reset}/> : null}
          {this.state.defender ? <OptionCard business={this.state.defender} removeOption={this.removeOption} opponent={this.state.challenger} which={'challenger'} businessPool={this.state.businessPool} reset={this.reset}/> : null}
          {this.renderForms()}
  
      </View>
    );
  }
}
