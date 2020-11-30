const leader_achievementsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LEADER_ACHIEVEMENTS':
      return action.payload;
    default:
      return state;
  }
};

export default leader_achievementsReducer;
