<template>
  <tr>
    <td class="px-6 py-2 whitespace-nowrap">
      <div class="flex items-left">
        <div class="ml-0">
          <div class="text-sm font-medium text-gray-900">
            {{ dateMatch }}
          </div>
          <!-- <div class="text-sm text-gray-500">jane.cooper@example.com</div> -->
        </div>
      </div>
    </td>
    <td class="px-6 py-2 whitespace-nowrap">
      <span
        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
      >
        {{ match.status }}
      </span>
    </td>
    <td class="px-6 py-2 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ match.homeTeam.name }}</div>
    </td>
    <td class="px-6 py-2 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ match.awayTeam.name }}</div>
    </td>
    <td class="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
      <span v-if="isScore"
        >{{ match.score.fullTime.homeTeam }} :
        {{ match.score.fullTime.awayTeam }}</span
      >
      <span v-else> - - </span>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'MatchRow',
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isScore() {
      return (
        this.match.score.fullTime.homeTeam !== null &&
        this.match.score.fullTime.awayTeam !== null
      )
    },
    dateMatch() {
      const options = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour12: false,
      }
      const event = new Date(this.match.utcDate)
      return event.toLocaleDateString('ru-RU', options)
    },
  },
}
</script>
