const initialState = 'none';
const nav_responsive_component = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NAV_COMPONENT':
      return action.payload;
    default:
      return state;
  }
};

export default nav_responsive_component;
