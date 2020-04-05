<template>
  <section>
    <div>
      <form @submit.prevent="addReview" class="addReview-container">
        <input type="text" placeholder="Email" />
        <textarea type="textarea" placeholder="Message" />
        <button>Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      review: { email: "", text: "" }
    };
  },
  methods: {
    async addReview(review) {
      await this.$store.dispatch({
        type: "addReview",
        review
      });
    }
  }
};
</script>

<style>
.addReview-container {
  display: flex;
  flex-direction: column;
  background-color: aqua;
}
</style>