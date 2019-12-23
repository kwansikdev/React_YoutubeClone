import { UPDATE_QUERY, LIKECOUNT } from '../actions/action';

const INITIONAL_STATE = {
  query: '',
  data: {},
};

export default function updateStore(state = INITIONAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case LIKECOUNT:
      const video = state.data[action.id]; // action.id안의 객체
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            count: video // 초기상태일때의 방어코드, 초기 값에 미리 0을 써두지 않는 이유는, 해당 video id값이 랜덤이기에 video id 값안에 있는 값을 초기값으로 넣어둘 수가 없다
              ? video.count + 1
              : 1,
          },
        },
      };
    default:
      return state;
  }
}
