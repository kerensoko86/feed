import reviewService from "@/services/review.service.js";
export const reviewStore = {
  state: {
    reviews: {
      reviews: [],
      avg: 0,
      total: 0
    },
    filterReviewsBy: {}
  },
  getters: {
    reviews(state) {
      return state.reviews;
    }
    // filterReviewsBy(state) {
    //   return state.filterReviewsBy;
    // },
  },
  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    setFilterReviewsBy(state, { filterBy }) {
      state.filterReviewsBy = filterBy;
    },
    addReview(state, { newReview }) {
      state.reviews.reviews.unshift(newReview);
    },
    removeReview(state, { reviewId }) {
      state.reviews = state.reviews.reviews.filter(
        review => review._id !== reviewId
      );
    }
  },
  actions: {
    async addReview(context, { review }) {
      const newReview = await reviewService.add(review);
      context.commit({ type: "addReview", newReview });
      return newReview;
    },
    async loadReviews(context) {
      const reviews = await reviewService.query(context.state.filterReviewsBy);
      context.commit({ type: "setReviews", reviews });
      return reviews;
    },
    async removeReview(context, { reviewId }) {
      await reviewService.remove(reviewId);
      context.commit({ type: "removeReview", reviewId });
    }
  }
};
