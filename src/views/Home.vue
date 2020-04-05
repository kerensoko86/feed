<template>
  <div class="home">
    <h1>Welcome to our page</h1>
    <addReview />
  </div>
</template>

<script>
import addReview from "@/components/addReview.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    addReview
  }
};
</script>
