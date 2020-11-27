const initialState = {
  data: '',
  id: null,
  call: 'NONE',
};

const makeATripLocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIP_LOCATION':
      return action.payload;
    default:
      return state;
  }
};

export default makeATripLocationReducer;
