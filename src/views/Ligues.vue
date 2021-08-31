<template>
  <div>
    <error v-if="isError" :error="error"></error>
    <div v-if="!isError">
      <h1 class="text-xl">Список лиг</h1>
      <search-field v-model="search" class="flex justify-center"></search-field>
      <div class="mt-16">
        <ul
          v-if="competitions"
          class="mx-auto w-4/6 grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center"
        >
          <li
            class="w-32 shadow-lg p-2 h-72"
            v-for="competition in searchResult"
            :key="competition.id"
          >
            <ligue-item :competition="competition"></ligue-item>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '../utils/apiCalls'
import LigueItem from '../components/LigueItem.vue'
import SearchField from '../components/SearchField.vue'
export default {
  name: 'Ligues',
  components: {
    LigueItem,
    SearchField,
  },
  data() {
    return {
      error: null,
      isDesabled: false,
      competitions: [],
      search: '',
    }
  },
  computed: {
    searchResult() {
      return this.competitions.filter(
        (item) => item.name.indexOf(this.search) !== -1
      )
    },
    isError() {
      return this.error && this.error.stack && this.error.message
    },
  },
  created() {
    const competitions = JSON.parse(localStorage.getItem('competitions'))
    if (competitions) this.competitions = competitions
    else {
      apiClient
        .getStat('competitions/?plan=TIER_ONE')
        .then((response) => {
          console.log(response.data)
          const { competitions } = response.data
          this.competitions = competitions
          localStorage.setItem('competitions', JSON.stringify(competitions))
        })
        .catch((error) => (this.error = error))
    }
  },
}
</script>
