const initialState = [];
const trip_locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIP_LOCATIONS':
      return action.payload;
    default:
      return state;
  }
};

export default trip_locationReducer;
