<template>
  <div class="container p-10 mx-auto">
    <h1>{{ competition.name }}</h1>
    <div>
      <span class="block text-left">Количество матчей в лиге {{ count }}</span>
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
                  <!-- More people... -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MatchRow from "../components/MatchRow.vue";
import apiClient from "../utils/apiCalls";
export default {
  components: { MatchRow },
  name: "LigueCalendar",
  data() {
    return {
      params: "",
      matches: [],
      competition: {},
      count: 0,
    };
  },
  created() {
    const competitionName = this.$route.params.competitionName;
    const matches = JSON.parse(localStorage.getItem("matches"));
    //safe request if LocalStorage already has matches
    if (matches && matches.competition.name === competitionName)
      this.mathces = matches.matches;
    else {
      const competitionId = this.$route.params.id;
      // const season = "2020";
      const params = {
        season: "2020",
      };
      apiClient
        .getStat(`competitions/${competitionId}/matches`, params)
        .then((response) => {
          console.log(response.data);
          const { matches, competition, count } = response.data;
          localStorage.setItem("matches", JSON.stringify(response.data));
          this.matches = matches;
          this.competition = competition;
          this.count = count;
        })
        .catch((error) => (this.error = error));
    }
  },
};
</script>
