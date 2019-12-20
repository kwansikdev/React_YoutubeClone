import { UPDATE_QUERY, LIKE } from '../actions/action';

const INITIONAL_STATE = {
  query: '',
};

export default function updateQuery(state = INITIONAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        query: action.query,
      };
    case LIKE:
      const video = state.data[action.id];
      return {
        ...state,
        data: {
          ...state.data,
          [action.id]: {
            ...video,
          },
        },
      };
    default:
      return state;
  }
}
