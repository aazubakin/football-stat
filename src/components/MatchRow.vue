<template>
  <tr>
    <td class="px-6 py-2 whitespace-nowrap">
      <div class="flex items-left">
        <div class="ml-0">
          <div class="text-sm font-medium text-gray-900">
            {{ match.utcDate }}
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
      {{ match.score.fullTime.homeTeam }} : {{ match.score.fullTime.awayTeam }}
    </td>
  </tr>
</template>
<script>
export default {
  name: "MatchRow",
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
};
</script>
