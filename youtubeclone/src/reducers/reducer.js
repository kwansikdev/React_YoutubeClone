import {
  UPDATE_QUERY,
  LIKECOUNT,
  DISLIKECOUNT,
  CHANNELINFO,
} from '../actions/action';

const INITIONAL_STATE = {
  query: '',
  data: {},
};

export default function updateStore(state = INITIONAL_STATE, action) {
  const video = state.data[action.id]; // action.id안의 객체
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case LIKECOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            likeCount:
              video && video.likeCount // 초기상태일때의 방어코드, 초기 값에 미리 0을 써두지 않는 이유는, 해당 video id값이 랜덤이기에 video id 값안에 있는 값을 초기값으로 넣어둘 수가 없다
                ? video.likeCount + 1
                : 1,
          },
        },
      };
    case DISLIKECOUNT:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            dislikeCount:
              video && video.dislikeCount ? video.dislikeCount + 1 : 1,
          },
        },
      };
    case CHANNELINFO:
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
            channelInfo: action.channelData,
          },
        },
      };
    default:
      return state;
  }
}
