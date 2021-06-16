<template>
  <div>
    <h1>This is team list page</h1>
    <form-call
      @submit="getLigues"
      @tokenChange="isDesabled = false"
      :errorMessage="error"
      :isDesabled="isDesabled"
    ></form-call>
    <div class="mt-16">
      <ul
        v-if="competitions"
        class="mx-auto w-4/6 grid md:grid-cols-4 sm:grid-cols-2 gap-4 justify-items-center"
      >
        <li
          class="w-24 cursor-pointer"
          v-for="competition in competitions"
          :key="competition.id"
        >
          <router-link :to="'/teams/' + competition.id">
            <div>
              <img
                :src="
                  competition.emblemUrl
                    ? competition.emblemUrl
                    : imgPath(competition.code)
                "
                :alt="competition.code"
              />
              <div class="mt-2">{{ competition.name }}</div>
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
  name: "Ligues",
  components: {
    FormCall,
  },
  data() {
    return {
      error: null,
      isDesabled: false,
      competitions: [],
    };
  },
  computed: {},
  mounted() {
    this.competitions = JSON.parse(localStorage.getItem("competitions"));
  },
  methods: {
    test() {
      console.log(this);
    },
    getLigues(token) {
      if (
        localStorage.competitions &&
        token === localStorage.getItem("token")
      ) {
        this.competitions = JSON.parse(localStorage.getItem("competitions"));
        this.isDesabled = true;
        return;
      }
      apiClient
        .getStat("competitions/?plan=TIER_ONE", token)
        .then((response) => {
          console.log(response.data);
          const { competitions } = response.data;
          localStorage.setItem("competitions", JSON.stringify(competitions));
          this.competitions = JSON.parse(localStorage.getItem("competitions"));
          this.isDesabled = true;
        })
        .catch((e) => (this.error = e));
    },
    imgPath(code) {
      return require("@/assets/ligues_icon/" + code + ".png");
    },
  },
};
</script>
