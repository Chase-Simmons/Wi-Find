/*-----> CORE <-----*/
import React, { Component } from 'react';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
/*-----> MATERIAL-UI <-----*/

export default class Leaderboards extends Component {
  render() {
    return (
      <ListItem
        key={this.props.key}
        style={{
          borderBottom: '2px #222222 solid',
        }}
      >
        <ListItemText>
          <span style={{ display: 'inline-flex' }}>
            <p style={{ textAlign: 'left' }}>{this.props.rank}. </p>
            <p style={{ textAlign: 'left', marginLeft: '25px' }}>
              {this.props.item.username}
            </p>
            <p style={{ textAlign: 'left', marginLeft: '70px' }}>
              Points : <span>{this.props.item.achievements}</span>
            </p>
          </span>
        </ListItemText>
      </ListItem>
    );
  }
}
