<template>
  <section class="review-list">
    <ul>
      <li v-for="review in reviews" :key="review._id">
        <div>
          <p>{{review.email}}</p>
          <p>{{review.text}}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: ["reviews"]
};
</script>

<style>
</style>