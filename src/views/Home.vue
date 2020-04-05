<template>
  <div class="home">
    <h1>Welcome to our page</h1>
    <addReview />
    <reviewFilter class="input" @set-filter="setFilter" />
  </div>
</template>

<script>
import addReview from "@/components/add-review.vue";
import reviewFilter from "@/components/review-filter.vue";

export default {
  name: "Home",
  components: {
    addReview,
    reviewFilter
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
    }
  }
};
</script>
