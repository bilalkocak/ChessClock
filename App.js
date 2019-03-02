import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import Router from './src/router'
export default class App extends Component {
  render() {
    const {container}=styles;
    return (
      <View style={container}>
        <Router />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
