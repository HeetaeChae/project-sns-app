//액션 타입
export const ADD_SCRAP_COUNT = "ADD_SCRAP_COUNT";
export const SUBTRACT_SCRAP_COUNT = "SUBTRACT_SCRAP_COUNT";
export const RESET_SCRAP_COUNT = "DELETE_SCRAP_COUNT";

//액션 생성자 함수

//초기 상태
const initialState = 0;

//리듀서
const scrap = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SCRAP_COUNT:
      return state + 1;
    case SUBTRACT_SCRAP_COUNT:
      return state - 1;
    case RESET_SCRAP_COUNT:
      return initialState;
    default:
      return state;
  }
};

export default scrap;
