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
      currentTurn: 0,
      isStopped: 0
    }
    this.firstTick = this.firstTick.bind(this);
    this.secondTick = this.secondTick.bind(this);
  }

  firstTick() {
    var firstSec = this.state.firstSec;
    var firstMin = this.state.firstMin;

    if (this.state.isStopped == 0) {
      if (firstSec > 0) {
        firstSec--
      } else {
        firstSec = 59;
        firstMin--
      }
    }

    this.setState({
      firstMin,
      firstSec
    })
  }

  secondTick() {
    var secondSec = this.state.secondSec;
    var secondMin = this.state.secondMin;

    if (this.state.isStopped == 0) {
      if (secondSec > 0) {
        secondSec--
      } else {
        secondSec = 59;
        secondMin--
      }
    }
    this.setState({
      secondMin,
      secondSec
    })
  }


  componentDidMount = () => {
    setInterval(() => {
      if (this.state.currentTurn == 0) {
        this.firstTick();
      } else if (this.state.currentTurn == 1) {
        this.secondTick();
      }
    }, 1000);
  }



  render() {
    const {
      container,
      firstClock,
      nextTurnText,
      secondClock,
      currentTurnText,
      controller,
      controllerText,

    } = styles;

    var stoppedMessage = "DEVAM ET";
    var startedMessage = "DURDUR";
    return (
      <View style={container}>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              currentTurn: 1
            })
          }}>
          <View
            style={firstClock}>
            <Text style={(this.state.currentTurn)?nextTurnText:currentTurnText}>{this.state.firstMin} : {this.state.firstSec} </Text>
          </View>

        </TouchableWithoutFeedback>

        <View style={controller}>
          <Text
            style={controllerText}
            onPress={() => {
              if (this.state.isStopped == 1) {
                this.setState({
                  isStopped: 0
                })
              } else {
                this.setState({
                  isStopped: 1
                })
              }
            }}>{this.state.isStopped ? stoppedMessage : startedMessage}</Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              currentTurn: 0
            })
          }}>
          <View style={secondClock}>
            <Text style={(this.state.currentTurn)?currentTurnText:nextTurnText}>{this.state.secondMin} : {this.state.secondSec}</Text>
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
    backgroundColor: 'black',
    color: 'white',
  },
  firstClock: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
    backgroundColor: 'black',
    width: '100%',
    transform: [{ rotate: '90deg' }],
  },
  nextTurnText: {
    color: 'white',
    fontSize: 70,
  },
  secondClock: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 9,
    backgroundColor: 'black',
    width: '72%',
    transform: [{ rotate: '90deg' }],
  },
  currentTurnText: {
    color: 'yellow',
    fontSize: 70
  },
  controller: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: 'red',
    width: '100%'
  },
  controllerText: {
    color: 'white',
    fontSize: 20,
  }
});
