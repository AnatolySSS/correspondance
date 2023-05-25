const GET_PERCENT_COMPLETED = "correspondance/preloaderReducer/GET_PERCENT_COMPLETED";

let initialState = {
  percentCompleted: 0,
};

const preloaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERCENT_COMPLETED:
      return {
        ...state,
        percentCompleted: action.percentCompleted,
      };
    default:
      return state;
  }
};

export const getPercentCompleted = (percentCompleted) => {
  return {
    type: GET_PERCENT_COMPLETED,
    percentCompleted: percentCompleted,
  };
};

export default preloaderReducer;
