export const UPDATE_QUERY = 'UPDATE_QUERY';
export const LIKECOUNT = 'LIKECOUNT';
export const DISLIKECOUNT = 'DISLIKECOUNT';
export const CHANNELINFO = 'CHANNELINFO';

export function updateQuery(query) {
  return { type: UPDATE_QUERY, query };
}

export function likeCount(id) {
  return { type: LIKECOUNT, id };
}

export function dislikeCount(id) {
  return { type: DISLIKECOUNT, id };
}

export function selectedchannelInfo(id, channelData) {
  return { type: CHANNELINFO, id, channelData };
}
