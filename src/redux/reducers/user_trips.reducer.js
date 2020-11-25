const initialState = [
  {
    id: -1,
    trip_name: 'No Trips',
  },
];
const user_tripsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_TRIPS':
      return action.payload;
    default:
      return state;
  }
};

export default user_tripsReducer;
