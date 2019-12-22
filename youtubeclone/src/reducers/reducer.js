import { UPDATE_QUERY, LIKECOUNT } from '../actions/action';

const INITIONAL_STATE = {
  query: '',
  data: {},
};

export default function updateStore(state = INITIONAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        query: action.query,
      };
    case LIKECOUNT:
      const videoInfo = state.data[action.id];

      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...videoInfo,
            count: videoInfo ? videoInfo.count + 1 : 1,
          },
        },
      };
    default:
      return state;
  }
}
