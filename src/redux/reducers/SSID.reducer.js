const SSIDReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SSID':
      return action.payload;
    default:
      return state;
  }
};

export default SSIDReducer;
