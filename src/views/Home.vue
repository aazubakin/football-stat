<template>
  <div class="flex justify-center font-sans">
    <form class="grid w-px=400" @submit.prevent="submit">
      <label for="token">
        Enter your API token from football-data.org here
      </label>
      <input
        class="my-3"
        name="token"
        type="text"
        v-model="token"
        placeholder="Your token"
      />
      <input
        class="p-2 bg-blue-700 hover:bg-blue-500 c shadow-md cursor-pointer text-blue-50 rounded"
        type="submit"
        value="Submit"
      />
      <div class="my-3" v-if="errors.length">
        <p>Please correct the following error(s):</p>
        <ul>
          <li class="text-red-500" v-for="(error, idx) in errors" :key="idx">
            {{ error }}
          </li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from "../utils/apiCalls";

export default {
  name: "Home",
  data() {
    return {
      token: null,
      errors: [],
    };
  },
  methods: {
    submit() {
      this.errors = [];
      if (!this.token) {
        this.errors.push("Token required");
      } else if (this.token.length < 22) {
        this.errors.push("Invalid token, length must be more than 21 symbols");
      }
      if (this.errors.length === 0) {
        apiClient
          .getStat("competitions/", this.token)
          .then((response) => console.log(response.data))
          .catch((e) => this.errors.push(e));
      }
    },
  },
  watch: {
    token() {
      this.errors = [];
    },
  },
};
</script>
