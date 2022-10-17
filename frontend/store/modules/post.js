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
      return [...state, ...action.payload];
    case DELETE_POST:
      const deletedPosts = state.filter((post) => post._id !== action.payload);
      return [...deletedPosts];
    case EDIT_POST:
      //바꾼 포스트의 아이디를 이용해 해당 인덱스를 알아낸다.
      const editPostIdx = state.findIndex(
        (post) => post._id === action.payload._id
      );
      const posts = [...state];
      posts[editPostIdx] = action.payload;
      console.log(posts);
    //해당 인덱스의 포스트를 삭제한다.
    //해당 인덱스에 포스트를 추가한다.
    default:
      return state;
  }
};

export default post;
