<template>
  <section class="reviews-container">
    <form @submit.prevent="addReview" class="addReview-container">
      <input type="text" placeholder="Email" v-model="review.email" />
      <textarea type="textarea" placeholder="Message" v-model="review.text" />
      <button>Submit</button>
    </form>
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
  width: 70%;
  margin: auto;
  padding: 20px;
  background-color: rgb(228, 222, 222);
}

button {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 30%;
  background-color: #0f75b1;
  color: white;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  font-size: 16px;
  padding: 10px 22px;
  cursor: pointer;
}
</style>