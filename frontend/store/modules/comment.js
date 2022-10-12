//액션 타입
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//액션 생성자 함수

//초기 상태
const initialState = [];

//리듀서
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [...action.payload, ...state];
    default:
      return state;
  }
};

export default post;
