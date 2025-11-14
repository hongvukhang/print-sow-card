const initialState = [];

export const printReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ARRAY":
      return action.payload; // luôn thay thế toàn bộ array cũ
    default:
      return state;
  }
};
