<template>
  <div>
    <error v-if="isError" :error="error"></error>
    <div v-if="!isError">
      <h1 class="text-xl">{{ competition.name }}</h1>
      <div class="container p-10 mx-auto">
        <div>
          <div class="flex items-center justify-around mb-4">
            <span class="block text-left"
              >Количество матчей в лиге {{ count }}</span
            >
            <div class="flex">
              <start-date v-model="dateFrom"></start-date>
              <end-date v-model="dateTo"></end-date>
            </div>
          </div>
          <div class="flex flex-col text-left">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
              >
                <div
                  class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                >
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Home team
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Away team
                        </th>
                        <th
                          scope="col"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Score
                        </th>
                      </tr>
                    </thead>
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
export default {
  components: { MatchRow, Error, StartDate, EndDate },
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
    const matches = JSON.parse(localStorage.getItem('matches'))
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
        .getStat(`competitions/${competitionId}/matches`, params)
        .then((response) => {
          console.log(response.data)
          const { matches, competition, count } = response.data
          localStorage.setItem('matches', JSON.stringify(response.data))
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
