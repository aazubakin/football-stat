<template>
  <div class="about">
    <h1>This is team list page</h1>
    <div class="mt-16">
      <ul
        v-if="teams"
        class="mx-auto w-4/6 grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center"
      >
        <li class="w-24 cursor-pointer" v-for="team in teams" :key="team.id">
          <router-link :to="'/team_calendar' + team.id">
            <div>
              <img :src="team.crestUrl" :alt="team.name" />
              <div class="mt-2">{{ team.name }}</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import apiClient from "../utils/apiCalls";
export default {
  data() {
    return {
      teams: [],
      error: null,
    };
  },
  created() {
    const params = this.$route.params.id;
    apiClient
      .getStat(`competitions/${params}/teams/?plan=TIER_ONE`)
      .then((response) => {
        console.log(response.data);
        const { teams } = response.data;
        localStorage.setItem("teams", JSON.stringify(teams));
        this.teams = JSON.parse(localStorage.getItem("teams"));
      })
      .catch((e) => (this.error = e));
  },
};
</script>
