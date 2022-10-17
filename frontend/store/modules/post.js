//액션 타입
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";

//액션 생성자 함수

//초기 상태
const initialState = [];

//리듀서
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return [...state, ...action.payload];
    case DELETE_POST:
      const deletedPosts = state.filter((post) => post._id !== action.payload);
      return [...deletedPosts];
    default:
      return state;
  }
};

export default post;
