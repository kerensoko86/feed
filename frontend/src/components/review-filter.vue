<template>
  <section class="review-filter">
    <!-- Search by title -->
    <input
      @input="emitFilter"
      class="input"
      placeholder="Filter"
      prefix-icon="el-icon-search"
      v-model="filterBy.name"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        text: ""
      }
    };
  },
  methods: {
    emitFilter() {
      console.log(this.filterBy, "step1");
      this.$emit("set-filter", this.filterBy);
    }
  }
};
</script>

<style></style>
