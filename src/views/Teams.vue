<template>
  <div>
    <error v-if="isError" :error="error"></error>
    <div v-if="!isError">
      <h1 class="text-xl">{{ competition.name }}</h1>
      <div class="mt-16">
        <ul
          v-if="teams"
          class="mx-auto w-4/6 grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center"
        >
          <li class="w-24 cursor-pointer" v-for="team in teams" :key="team.id">
            <router-link
              :to="{
                name: 'TeamCalendar',
                params: { id: team.id, teamName: team.name },
              }"
            >
              <div>
                <img :src="team.crestUrl" :alt="team.name" />
                <div class="mt-2">{{ team.name }}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import apiClient from '../utils/apiCalls'
import Error from '../components/Error.vue'
export default {
  name: 'Teams',
  components: { Error },
  data() {
    return {
      teams: [],
      competition: {},
      error: null,
    }
  },
  computed: {
    isError() {
      return this.error && this.error.stack && this.error.message
    },
  },
  created() {
    const competitionName = this.$route.params.competitionName
    const teams = JSON.parse(localStorage.getItem('teams'))
    //safe request if LocalStorage already has teams
    if (teams && teams.competition.name === competitionName)
      this.teams = teams.teams
    else {
      const teamId = this.$route.params.id
      apiClient
        .getStat(`competitions/${teamId}/teams/?plan=TIER_ONE`)
        .then((response) => {
          console.log(response.data)
          localStorage.setItem('teams', JSON.stringify(response.data))
          const { teams, competition } = response.data
          this.teams = teams
          this.competition = competition
        })
        .catch((error) => (this.error = error))
    }
  },
}
</script>
