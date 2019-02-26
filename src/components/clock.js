import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstMin: 0,
      firstSec: 4,
      firstSplit: 0,
      firstMove: 0,

      secondMin: 0,
      secondSec: 4,
      secondSplit: 0,
      secondMove: 0,


      extraTime: 5,
      currentTurn: 0,
      isPaused: 0,
      isStopped: 1,
      isEnded: 0
    }
    this.firstTick = this.firstTick.bind(this);
    this.secondTick = this.secondTick.bind(this);
    this.firstPress = this.firstPress.bind(this);
    this.secondPress = this.secondPress.bind(this);
  }


  firstPress() {
    if (this.state.isStopped == 1) {
      this.setState({
        isStopped: 0
      })
    }
    if (this.state.currentTurn == 0) {
      if (!this.state.isPaused&&!this.state.isEnded) {
        this.setState({
          currentTurn: 1,
          firstSec: this.state.firstSec + 5
        })
      }
    }
  }
  secondPress() {
    if (this.state.isStopped == 1) {
      this.setState({
        isStopped: 0
      })
    }
    if (this.state.currentTurn == 1) {

      if (!this.state.isPaused&&!this.state.isEnded) {
        this.setState({
          currentTurn: 0,
          secondSec: this.state.secondSec + 5
        })
      }
    }
  }
  firstTick() {
    var firstSec = this.state.firstSec;
    var firstMin = this.state.firstMin;

    if (this.state.isPaused == 0 && this.state.isStopped == 0) {
      if (firstSec > 0 && firstMin >= 0) {
        firstSec--
      } else {
        firstSec = 59;
        firstMin--
      }
    }
    if(firstMin<0||firstSec<0){
      this.setState({
        firstMin:0,
        firstSec:0,
        isEnded:1,
        isStopped:1,
        isPaused:1
      })
    }else{
      this.setState({
        firstMin,
        firstSec
      })
    }
  }

  secondTick() {
    var secondSec = this.state.secondSec;
    var secondMin = this.state.secondMin;

    if (this.state.isPaused == 0 && this.state.isStopped == 0) {
      if (secondSec > 0 && secondMin >= 0) {
        secondSec--
      } else {
          secondSec = 59;
          secondMin--
      }
    }
    if(secondMin<0||secondSec<0){
      this.setState({
        secondMin:0,
        secondSec:0,
        isEnded:1,
        isStopped:1,
        isPaused:1
      })
    }else{
      this.setState({
        secondMin,
        secondSec
      })
    }
    
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
      clock,
      nextTurnText,
      currentTurnText,
      controller,
      controllerText,
      clockArea
    } = styles;

    var stoppedMessage = "DEVAM ET";
    var startedMessage = "DURDUR";
    var firsClock = nextTurnText;
    var secondClock = nextTurnText;
    if (!this.state.isStopped) {
      if (this.state.currentTurn == 1) {
        secondClock = currentTurnText;
        firsClock = nextTurnText;
      } else {
        firsClock = currentTurnText;
        secondClock = nextTurnText
      }

    }
    return (
      <View style={container}>
        <TouchableOpacity
          style={clockArea}
          onPress={this.firstPress}>
          <View
            style={clock}>
            <Text style={firsClock}>{this.state.firstMin} : {this.state.firstSec} </Text>
          </View>

        </TouchableOpacity >

        <View style={controller}>
          <Text
            style={controllerText}
            onPress={() => {
              if (this.state.isPaused == 1) {
                this.setState({
                  isPaused: 0
                })
              } else {
                this.setState({
                  isPaused: 1
                })
              }
            }}>{this.state.isPaused ? stoppedMessage : startedMessage}</Text>
        </View>

        <TouchableOpacity
          style={clockArea}
          onPress={this.secondPress}>
          <View style={clock}>
            <Text style={secondClock}>{this.state.secondMin} : {this.state.secondSec}</Text>
          </View>

        </TouchableOpacity >

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
  clock: {
    transform: [{ rotate: '90deg' }],
  },
  currentTurnText: {
    color: 'white',
    fontSize: 70
  },

  nextTurnText: {
    color: '#a779ce',
    fontSize: 70,
  },
  controller: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: '#626262',
    width: '100%'
  },
  controllerText: {
    color: 'white',
    fontSize: 20,
  },
  clockArea: {
    backgroundColor: '#323232',
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});
