import { UPDATE_QUERY } from '../actions/action';

const INITIONAL_STATE = {
  query: '',
};

export default function updateQuery(state = INITIONAL_STATE, action) {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        query: action.query,
      };
    default:
      return state;
  }
}
