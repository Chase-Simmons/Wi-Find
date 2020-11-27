/*-----> CORE <-----*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
/*-----> CORE <-----*/

/*-----> MATERIAL-UI <-----*/
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
/*-----> MATERIAL-UI <-----*/

import swal from 'sweetalert';

class MyTrips extends Component {
  closeClick = () => {
    this.props.superReducer({ call: 'SET', data: 'none' });
  };
  render() {
    return (
      <>
        <ListItem
          button
          style={{
            backgroundColor: '#ffc8b5',
            marginTop: '-8px',
            marginBottom: '-8px',
          }}
          onClick={this.closeClick}
        >
          <ListItemIcon>
            <CancelIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <ListItem
          style={{
            height: 75,
            fontSize: 40,
            marginTop: '8px',
            borderBottom: '2px #222222 solid',
            borderTop: '2px #222222 solid',
          }}
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText>
            <TextField
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 24,
                },
              }}
              primary="Title"
              placeholder="TRIP NAME"
            />
          </ListItemText>
          <ListItemIcon></ListItemIcon>
        </ListItem>
      </>
    );
  }
}

export default connect(mapStoreToProps)(MyTrips);
