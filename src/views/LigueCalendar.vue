<template>
  <div>
    <error v-if="isError" :error="error"></error>
    <div v-if="!isError">
      <h1 class="text-2xl font-bold">
        Список матчей лиги: "{{ competition.name }}"
      </h1>
      <div class="container p-10 mx-auto">
        <div>
          <div class="flex items-center flex-wrap justify-center">
            <span class="block text-left mb-4 mr-4"
              >Количество матчей в лиге: {{ count }}</span
            >
            <div class="flex flex-wrap">
              <start-date class="mb-4" v-model="dateFrom"></start-date>
              <end-date class="mb-4" v-model="dateTo"></end-date>
            </div>
          </div>
        </div>
      </div>
      <div class="min-h-screen bg-blue-100 py-5 text-left">
        <div class="overflow-x-auto w-full">
          <table
            class="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden"
          >
            <table-header></table-header>
            <tbody class="bg-white divide-y divide-gray-200">
              <match-row
                v-for="match in matches"
                :key="match.id"
                :match="match"
              ></match-row>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Error from '../components/Error.vue'
import MatchRow from '../components/MatchRow.vue'
import apiClient from '../utils/apiCalls'
import StartDate from '../components/StartDate.vue'
import EndDate from '../components/EndDate.vue'
import TableHeader from '../components/TableHeader.vue'
import API from '@/api'

export default {
  components: {
    MatchRow,
    Error,
    StartDate,
    EndDate,
    TableHeader,
  },
  name: 'LigueCalendar',
  data() {
    return {
      params: '',
      matches: [],
      competition: {},
      count: 0,
      error: null,
      dateFrom: '2021-06-01',
      dateTo: new Date().toLocaleDateString('en-CA'),
    }
  },
  computed: {
    isError() {
      return this.error && this.error.stack && this.error.message
    },
  },
  created() {
    const competitionName = this.$route.params.competitionName
    const matches = JSON.parse(localStorage.getItem('matchesLigue'))
    //safe request if LocalStorage already has matches
    if (matches && matches.competition.name === competitionName)
      this.mathces = matches.matches
    else this.getMatches()
  },
  methods: {
    getMatches() {
      const competitionId = this.$route.params.id
      const params = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
      }
      apiClient
        .getStat(API.ligues.ligueMatches(competitionId), params)
        .then((response) => {
          const { matches, competition, count } = response.data
          localStorage.setItem('matchesLigue', JSON.stringify(response.data))
          this.matches = matches
          this.competition = competition
          this.count = count
        })
        .catch((error) => (this.error = error))
    },
  },
  watch: {
    dateFrom() {
      this.getMatches()
    },
    dateTo() {
      this.getMatches()
    },
  },
}
</script>
