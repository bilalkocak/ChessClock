import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstMin: 10,
      firstSec: 0,
      firstSplit: 0,
      firstMove: 0,

      secondMin: 10,
      secondSec: 0,
      secondSpli: 0,
      secondMove: 0,


      extraSecond: 5,
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
    var {
      firstSec,
      firstMin,
      extraSecond,
      isStopped,
      currentTurn,
      isPaused,
      isEnded
    } = this.state;
    if (isStopped == 1) {
      this.setState({
        isStopped: 0,
        firstSec,
        firstMin,
        currentTurn: 1
      })
    }
    if (currentTurn == 0) {

      if (!isPaused && !isEnded && !isStopped) {
        if (firstSec + extraSecond > 59) {
          firstSec = (firstSec + extraSecond) % 59;
          firstMin++
        } else {
          firstSec += extraSecond
        }
        this.setState({
          currentTurn: 1,
          firstSec,
          firstMin
        })
      }
    }
  }

  secondPress() {
    var {
      secondSec,
      secondMin,
      extraSecond,
      isStopped,
      currentTurn,
      isPaused,
      isEnded
    } = this.state;
    if (isStopped == 1) {
      this.setState({
        isStopped: 0,
        secondMin,
        secondSec,
        currentTurn: 0
      })
    }
    if (currentTurn == 1) {

      if (!isPaused && !isEnded && !isStopped) {
        if (secondSec + extraSecond > 59) {
          secondSec = (secondSec + extraSecond) % 59;
          secondMin++
        } else {
          secondSec += extraSecond
        }
        this.setState({
          currentTurn: 0,
          secondSec,
          secondMin
        })
      }
    }
  }

  firstTick() {
    var {
      firstSec,
      firstMin,
      isPaused,
      isStopped
    } = this.state;

    if (isPaused == 0 && isStopped == 0) {
      if (firstSec > 0 && firstMin >= 0) {
        firstSec--
      } else {
        firstSec = 59;
        firstMin--
      }
    }
    if (firstMin < 0 || firstSec < 0) {
      this.setState({
        firstMin: 0,
        firstSec: 0,
        isEnded: 1,
        isStopped: 1,
        isPaused: 1
      })
    } else {
      this.setState({
        firstMin,
        firstSec
      })
    }
  }

  secondTick() {
    var {
      secondSec,
      secondMin,
      isPaused,
      isStopped
    } = this.state;

    if (isPaused == 0 && isStopped == 0) {
      if (secondSec > 0 && secondMin >= 0) {
        secondSec--
      } else {
        secondSec = 59;
        secondMin--
      }
    }
    if (secondMin < 0 || secondSec < 0) {
      this.setState({
        secondMin: 0,
        secondSec: 0,
        isEnded: 1,
        isStopped: 1,
        isPaused: 1
      })
    } else {
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

    const {
      currentTurn,
      isStopped,
      isPaused,
      isEnded,
      firstMin,
      firstSec,
      firstMove,
      secondMin,
      secondSec,
      secondMove,
    } = this.state;

    var stoppedMessage = "DEVAM ET";
    var startedMessage = "DURDUR";
    var firsClock = nextTurnText;
    var secondClock = nextTurnText;
    if (!isStopped) {
      if (currentTurn == 1) {
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
            <Text style={firsClock}>{firstMin} : {firstSec} </Text>
          </View>

        </TouchableOpacity >

        <View style={controller}>
          <Text
            style={controllerText}
            onPress={() => {
              if (isPaused == 1) {
                this.setState({
                  isPaused: 0
                })
              } else {
                this.setState({
                  isPaused: 1
                })
              }
            }}>{isPaused ? stoppedMessage : startedMessage}</Text>
            <Text
            onPress={
              ()=>{
                Actions.settings()
              }
            }
            >Ayarlar</Text>
        </View>

        <TouchableOpacity
          style={clockArea}
          onPress={this.secondPress}>
          <View style={clock}>
            <Text style={secondClock}>{secondMin} : {secondSec}</Text>
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


export default Clock;