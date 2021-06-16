<template>
  <div class="about">
    <h1>This is team list page</h1>
    <form-call
      @submit="getLigues"
      @tokenChange="isDesabled = false"
      :errorMessage="error"
      :isDesabled="isDesabled"
    ></form-call>
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
import FormCall from "../components/FormCall.vue";
import apiClient from "../utils/apiCalls";
export default {
  components: { FormCall },
  data() {
    return {
      teams: [],
      isDesabled: false,
      error: null,
    };
  },
  mounted() {
    const token = localStorage.getItem("token");
    const params = this.$route.params.id;
    if (localStorage.teams && token === localStorage.getItem("token")) {
      this.teams = JSON.parse(localStorage.getItem("teams"));
      this.isDesabled = true;
      return;
    }
    apiClient
      .getStat(`competitions/${params}/teams/?plan=TIER_ONE`, token)
      .then((response) => {
        console.log(response.data);
        const { teams } = response.data;
        localStorage.setItem("teams", JSON.stringify(teams));
        this.teams = JSON.parse(localStorage.getItem("teams"));
        // this.isDesabled = true;
      })
      .catch((e) => (this.error = e));
  },
};
</script>
