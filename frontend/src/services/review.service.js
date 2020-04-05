import httpService from "./http.service.js";

export default {
  add,
  query,
  remove
};

function query(filterBy) {
  let queryString = "?";
  if (filterBy.tourGuideId) {
    queryString += `tourGuideId=${filterBy.tourGuideId}`;
  }
  if (filterBy.byUserId) {
    queryString += `byUserId=${filterBy.byUserId}`;
  }
  return httpService.get(`review${queryString}`);
}

function remove(reviewId) {
  return httpService.delete(`review/${reviewId}`);
}
function add(review) {
  return httpService.post(`review`, review);
}
