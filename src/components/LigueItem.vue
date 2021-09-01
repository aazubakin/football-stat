<template>
  <div class="flex flex-col h-full justify-between items-center">
    <div>
      <img
        :src="competition.emblemUrl ? competition.emblemUrl : imgPath"
        :alt="competition.code"
      />
      <div class="mt-2">{{ competition.name }}</div>
    </div>
    <div>
      <router-link
        class="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-4 rounded mb-2 block"
        :to="{
          name: 'teams',
          params: {
            id: competition.id,
            competitionName: competition.name,
            competitionCode: competition.code,
          },
        }"
        >Команды
      </router-link>
      <router-link
        class="bg-blue-500 hover:bg-blue-700 text-white py-1.5 px-4 rounded mb-2 block"
        :to="{ name: 'LigueCalendar', params: { id: competition.id } }"
        >Матчи
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "LigueItem",
  props: {
    competition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgPath() {
      return require("@/assets/ligues_icon/" + this.competition.code + ".png");
    },
  },
};
</script>
