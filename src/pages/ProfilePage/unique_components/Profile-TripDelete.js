import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export default class TripDelete extends Component {
  state = {
    hoverColor: 'black',
  };

  onEnter = () => {
    this.setState({
      isHovered: 'red',
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
      <DeleteIcon
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
        style={{ color: this.state.isHovered, fontSize: 40 }}
        onClick={this.props.clickDelete(trip)}
      />
    );
  }
}
