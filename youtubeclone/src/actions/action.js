export const UPDATE_QUERY = 'QUERY';

export function updateQuery(query) {
  return { type: UPDATE_QUERY, query };
}
