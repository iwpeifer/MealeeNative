import React from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

import Styles from '../stylesheets/Styles'

export default class PlayScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{height: 100, justifyContent: 'center', alignItems: 'center'}}>
        <View style={Styles.next}>
          <Button
            onPress={() => this.props.retrieveBusinesses()}
            title={"PLAY!"}
            color={'#fff'}
            accessibilityLabel={"play"}
          />
        </View>
        {this.props.displayGoBackButton('priceMin')}
      </View>
    );
  }
}
