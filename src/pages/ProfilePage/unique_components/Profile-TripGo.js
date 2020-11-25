import React, { Component } from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';

export default class TripDelete extends Component {
  state = {
    hoverColor: 'black',
  };

  onEnter = () => {
    this.setState({
      isHovered: 'aqua',
    });
  };
  onLeave = () => {
    this.setState({
      isHovered: 'black',
    });
  };
  render() {
    const trip = this.props.trip;
    return (
      <NavigationIcon
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
        style={{ color: this.state.isHovered, fontSize: 40 }}
        onClick={this.props.clickGo(trip)}
      />
    );
  }
}
