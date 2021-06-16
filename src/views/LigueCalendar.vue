<template>
  <div class="about">
    <h1>This is ligue calendar page {{ params }}</h1>
    <form-call></form-call>
  </div>
</template>
<script>
import FormCall from "../components/FormCall.vue";
export default {
  components: { FormCall },
  data() {
    return {
      params: "",
    };
  },
  mounted() {
    this.params = this.$route.params.id;
  },
};
</script>
