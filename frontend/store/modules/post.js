//액션 타입
export const GET_POST = "GET_POST";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";

//액션 생성자 함수

//초기 상태
const initialState = [];

//리듀서
const post = (state = initialState, action) => {
  switch (action.type) {
    case GET_POST:
      return [...state, ...action.payload];
    case ADD_POST:
      return [action.payload, ...state];
    case DELETE_POST:
      const deletedPosts = state.filter(
        (post) => post._id !== action.payload._id
      );
      return [...deletedPosts];
    case EDIT_POST:
      const editedPost = state.map((post) =>
        post._id === action.payload._id
          ? {
              ...post,
              content: action.payload.content,
              image: [...action.payload.image],
            }
          : post
      );
      return [...editedPost];
    default:
      return state;
  }
};

export default post;
