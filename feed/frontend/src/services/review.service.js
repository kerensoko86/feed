import httpService from "./http.service.js";

export default {
  add,
  query,
  remove
};

function query() {

  // if (filterBy.byUserId) {
  //   queryString += `byUserId=${filterBy.byUserId}`;
  // }
  return httpService.get(`feed`);
}

function remove(reviewId) {
  return httpService.delete(`feed/${reviewId}`);
}
function add(review) {
  return httpService.post(`feed`, review);
}
