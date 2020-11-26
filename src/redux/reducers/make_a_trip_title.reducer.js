const initialState = '';

const makeATripTitleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TRIP_TITLE':
      return action.payload;
    default:
      return state;
  }
};

export default makeATripTitleReducer;
