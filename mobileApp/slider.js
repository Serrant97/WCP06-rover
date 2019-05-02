import React from "react";
import {
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState
} from "react-native";
import styled from "styled-components";

type StateType = {
  barHeight: number | null,
  deltaValue: number,
  value: number
};

const initialValue = 0;
const min = 0;
const max = 100;
const CIRCLE_DIAMETER = 50;

export default class Slider extends React.Component<{}, StateType> {
  state = {
    barHeight: null,
    deltaValue: 0,
    value: initialValue
  };

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (_, gestureState) => this.onMove(gestureState),
    onPanResponderRelease: () => this.onEndMove(),
    onPanResponderTerminate: () => {}
  });

  onMove(gestureState: PanResponderGestureState) {
    const { barHeight } = this.state;
    const newDeltaValue = this.getValueFromBottomOffset(
      -gestureState.dy,
      barHeight,
      min,
      max
    );

    this.setState({
      deltaValue: newDeltaValue
    });
  }
  onEndMove() {
    const { value, deltaValue } = this.state;
    this.setState({ value: value + deltaValue, deltaValue: 0 });
  }

  onBarLayout = (event: LayoutChangeEvent) => {
    const { height: barHeight } = event.nativeEvent.layout;
    this.setState({ barHeight });
  };

  capValueWithinRange = (value: number, range: number[]) => {
    if (value < range[0]) return range[0];
    if (value > range[1]) return range[1];
    return value;
  };

  getValueFromBottomOffset = (
    offset: number,
    barHeight: number | null,
    rangeMin: number,
    rangeMax: number
  ) => {
    if (barHeight === null) return 0;
    return ((rangeMax - rangeMin) * offset) / barHeight;
  };

  getBottomOffsetFromValue = (
    value: number,
    rangeMin: number,
    rangeMax: number,
    barHeight: number | null
  ) => {
    if (barHeight === null) return 0;
    const valueOffset = value - rangeMin;
    const totalRange = rangeMax - rangeMin;
    const percentage = valueOffset / totalRange;
    return barHeight * percentage;
  };

  render() {
    const { value, deltaValue, barHeight } = this.state;

    const cappedValue = this.capValueWithinRange(value + deltaValue, [
      min,
      max
    ]);
    const bottomOffset = this.getBottomOffsetFromValue(
      cappedValue,
      min,
      max,
      barHeight
    );

    return (

          <Container>
          <Value>{Math.floor(cappedValue)}</Value>
          <BarContainer>
            <Bar onLayout={this.onBarLayout} />
            <Circle
              bottomOffset={bottomOffset}
              {...this.panResponder.panHandlers}
            />
          </BarContainer>
          </Container>

    );
  }
}

const Container = styled.View`
  align-self: {this.props.orientation};
  justify-content: {this.props.orientation};
  flex-direction: row;
`;

const Value = styled.Text`
  color: red;
`;

const BarContainer = styled.View`
  width: ${CIRCLE_DIAMETER};
  align-items: center;
  padding-vertical: ${CIRCLE_DIAMETER / 2};
  margin-horizontal: 20;
`;
const Bar = styled.View`
  width: 5;
  background-color: black;
  flex-grow: 1;
`;

const Circle = styled.View`
  border-radius: ${CIRCLE_DIAMETER / 2};
  width: ${CIRCLE_DIAMETER};
  height: ${CIRCLE_DIAMETER};
  background-color: black;
  position: absolute;
  bottom: ${props => props.bottomOffset};
`;
