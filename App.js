import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Clock from './src/components/clock';
export default class App extends Component {
  render() {
    const {container,clock}=styles;
    return (
      <View style={container}>
        <Clock styles={clock}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  clock:{
    flex:1,
    height:100,
    width:100,
    backgroundColor:'black'
  }
});
