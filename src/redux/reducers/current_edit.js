const initialState = {
  id: null,
  stops: [],
};

const currentEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EDIT':
      return action.payload;
    default:
      return state;
  }
};

export default currentEditReducer;
