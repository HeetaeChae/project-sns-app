//액션 타입
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";

//액션 생성자 함수

//초기 상태
const initialState = [];

//리듀서
const post = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return [...action.payload, ...state];
    case DELETE_POST:
      console.log(action.payload);
      return [...state];
    case EDIT_POST:
      return [];
    default:
      return state;
  }
};

export default post;
