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
          borderBottom: '1px #F5EBF6 solid',
          backgroundColor: '#283C5E',
          boxShadow: '0 2px 15px #ac61b9',
        }}
      >
        <ListItemText>
          <span style={{ display: 'inline-flex' }}>
            <div style={{ width: '50%', minWidth: '175px' }}>
              <p style={{ textAlign: 'left', display: 'inline-block' }}>
                {this.props.rank}.{' '}
              </p>
              <p
                style={{
                  textAlign: 'left',
                  marginLeft: '25px',
                  display: 'inline-block',
                }}
              >
                {this.props.item.username}
              </p>
            </div>
            <div style={{ width: '50%' }}>
              <p style={{ textAlign: 'left' }}>
                Points : <span>{this.props.item.achievements}</span>
              </p>
            </div>
          </span>
        </ListItemText>
      </ListItem>
    );
  }
}
