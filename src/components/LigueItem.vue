<template>
  <router-link :to="'/teams/' + competition.id">
    <div>
      <img
        :src="competition.emblemUrl ? competition.emblemUrl : imgPath"
        :alt="competition.code"
      />
      <div class="mt-2">{{ competition.name }}</div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "LigueItem",
  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgPath() {
      return require("@/assets/ligues_icon/" + this.competition.code + ".png");
    },
  },
};
</script>
