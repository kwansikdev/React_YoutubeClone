export const UPDATE_QUERY = 'UPDATE_QUERY';
export const LIKECOUNT = 'LIKECOUNT';

export function updateQuery(query) {
  return { type: UPDATE_QUERY, query };
}

export function likeCount(id) {
  return { type: LIKECOUNT, id };
}
