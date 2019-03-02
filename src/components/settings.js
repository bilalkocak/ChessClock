import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions} from 'react-native-router-flux';
class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


 
  render() {
    const {
      container
    } = styles;

    

    
    return (
      <View style={container}>
        <Text
        onPress={() => Actions.clock() }
        >Ayarlar sayfası</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#323232',
    color: 'white',
  }
});


export default Settings;