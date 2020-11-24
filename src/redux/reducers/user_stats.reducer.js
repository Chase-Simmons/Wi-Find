const initialState = {
  username: '',
  points: 0,
  achievements: 0,
  unique_speedtest: 0,
  unique_connection: 0,
  rank: 0,
};
const user_statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_STATS':
      return action.payload;
    default:
      return state;
  }
};

export default user_statsReducer;
