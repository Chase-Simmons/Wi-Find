const leader_pointsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEADER_POINTS':
      return action.payload;
    default:
      return state;
  }
};

export default leader_pointsReducer;
