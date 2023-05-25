const SET_VISIBLE = "correspondance/tableReducer/SET_VISIBLE";

let initialState = {
  visible: false,
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBLE:
      return {
        ...state,
        visible: action.visible,
      };
    default:
      return state;
  }
};

export const setVisible = (visible) => ({ type: SET_VISIBLE, visible: visible });

export default sideBarReducer;
