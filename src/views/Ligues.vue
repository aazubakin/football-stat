<template>
  <div>
    <h1>This is team list page</h1>
    <div class="mt-16">
      <ul
        v-if="competitions"
        class="mx-auto w-4/6 grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center"
      >
        <li
          class="w-24 cursor-pointer"
          v-for="competition in competitions"
          :key="competition.id"
        >
          <ligue-item :competition="competition"></ligue-item>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import apiClient from "../utils/apiCalls";
import LigueItem from "../components/LigueItem.vue";
export default {
  name: "Ligues",
  components: {
    LigueItem,
  },
  data() {
    return {
      error: null,
      isDesabled: false,
      competitions: [],
    };
  },
  computed: {},
  created() {
    const competitions = JSON.parse(localStorage.getItem("competitions"));
    if (competitions) this.competitions = competitions;
    else {
      apiClient
        .getStat("competitions/?plan=TIER_ONE")
        .then((response) => {
          console.log(response.data);
          const { competitions } = response.data;
          this.competitions = competitions;
          localStorage.setItem("competitions", JSON.stringify(competitions));
        })
        .catch((error) => (this.error = error));
    }
  },
};
</script>
