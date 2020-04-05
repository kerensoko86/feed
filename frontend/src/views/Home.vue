<template>
  <div class="home">
    <h1>Welcome to our page</h1>
    <addReview />
    <reviewFilter class="input" @set-filter="setFilter" />
    <reviewList :reviews="reviews" />
  </div>
</template>

<script>
import addReview from "@/components/add-review.vue";
import reviewFilter from "@/components/review-filter.vue";
import reviewList from "@/components/review-list.vue";

export default {
  name: "Home",
  components: {
    addReview,
    reviewFilter,
    reviewList
  },
  data() {
    return {
      reviews: []
    };
  },
  methods: {
    setFilter(filterBy) {
      this.$store.commit({
        type: "filterReview",
        filterBy
      });
      this.$store.dispatch({
        type: "loadReviews"
      });
    },
    async getReviews() {
      const reviews = await this.$store.dispatch({
        type: "loadReviews"
      });
      this.reviews = reviews;
    }
  },
  created() {
    this.getReviews();
  }
};
</script>
