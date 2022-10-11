//액션 타입
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

//액션 생성자 함수

//초기 상태
const initialState = {
  isLoggedIn: false,
  me: {},
};

//리듀서
const user = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        isLoggedIn: true,
        me: { ...action.payload },
      };
    case LOG_OUT:
      return {
        isLoggedIn: false,
        me: {},
      };
    default:
      return state;
  }
};

export default user;
