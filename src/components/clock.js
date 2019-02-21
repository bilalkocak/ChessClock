import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstMin: 30,
      firstSec: 44,
      firstSplit: 0,
      firstMove: 0,

      secondMin: 30,
      secondSec: 44,
      secondSplit: 0,
      secondMove: 0,


      extraTime: 5,
      currentTurn: 1
    }
    this.firstTick = this.firstTick.bind(this);
    this.secondTick = this.secondTick.bind(this);
  }

  firstTick() {
    var firstSec = this.state.firstSec;
    var firstMin = this.state.firstMin;


    if (firstSec > 0) {
      firstSec--
    } else {
      firstSec = 59;
      firstMin--
    }


    this.setState({
      firstMin,
      firstSec
    })
  }

  secondTick() {
    var secondSec = this.state.secondSec;
    var secondMin = this.state.secondMin;


    if (secondSec > 0) {
      secondSec--
    } else {
      secondSec = 59;
      secondMin--
    }


    this.setState({
      secondMin,
      secondSec
    })
  }


  componentDidMount = () => {
    setInterval(() => {
      if (this.state.currentTurn == 1) {
        this.firstTick();
      } else if (this.state.currentTurn == 2) {
        this.secondTick();
      }
    }, 1000);
  }



  render() {
    const {
      container,
      firstClock,
      firstText,
      secondClock,
      secondText,
      controller,
      controllerText
    } = styles;
    return (
      <View style={container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              currentTurn: 2
            })
          }}>
          <View
            style={firstClock}>
            <Text
              onPress={() => {
                this.setState({
                  currentTurn: 2
                })
              }}
              style={firstText}>{this.state.firstMin} : {this.state.firstSec} </Text>
          </View>

        </TouchableWithoutFeedback>

        <View style={controller}>
          <Text style={controllerText}>30:44</Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              currentTurn: 1
            })
          }}>
          <View style={secondClock}>
            <Text style={secondText}>{this.state.secondMin} : {this.state.secondSec}</Text>
          </View>

        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
  },
  firstClock: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
    backgroundColor: 'black',
    width: '100%',
    transform: [{ rotate: '90deg' }]
  },
  firstText: {
    color: 'white',
    fontSize: 70,
  },
  secondClock: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
    backgroundColor: 'green',
    width: '100%',
    transform: [{ rotate: '90deg' }],
  },
  secondText: {
    color: 'yellow',
    fontSize: 70
  },
  controller: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: 'blue',
    width: '100%'
  },
  controllerText: {
    color: 'white',
    fontSize: 20,

  }
});
