import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = "correspondance/appReducer/SET_INITIALIZED";

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => {
  return {
    type: SET_INITIALIZED,
  };
};

export const initializeApp = () => {
  return (dispatch) => {
    let promis = dispatch(getAuthUserData(localStorage.getItem('accessToken')))
    promis.then(() => {
      dispatch(initializedSuccess())
    })
  };
};

export default appReducer;
