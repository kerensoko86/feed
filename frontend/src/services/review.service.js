import httpService from "./http.service.js";

export default {
  add,
  query,
  remove
};

function query() {
  // let queryString = "?";
  // if (filterBy.tourGuideId) {
  //   queryString += `tourGuideId=${filterBy.tourGuideId}`;
  // }
  // if (filterBy.byUserId) {
  //   queryString += `byUserId=${filterBy.byUserId}`;
  // }
  return httpService.get(`feed`);
}

function remove(feedId) {
  return httpService.delete(`feed/${feedId}`);
}
function add(feed) {
  console.log('in service: ', feed);

  return httpService.post(`feed`, feed);
}
