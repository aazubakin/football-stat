<template>
  <div>
    <form @submit.prevent="submit">
      <p>Enter your API token from football-data.org here</p>
      <input type="text" v-model="token" placeholder="Your token"/>
      <input type="submit" value="Submit" />
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, idx) in errors" :key="idx" >
            {{ error }}
          </li>
        </ul>
      </p>
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
      if (!this.token) {
        this.errors.push("Token required");
      } else if (this.token.length  < 22) {
        this.errors.push("Invalid token, length must be more than 21");
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
