<template>
  <div class="flex justify-center font-sans">
    <form class="grid w-px=400 mx-2" @submit.prevent="submit">
      <label for="token">
        Enter your API token from football-data.org here
      </label>
      <input
        class="my-3"
        name="token"
        type="text"
        v-model="token"
        :placeholder="isDesabled ? token : 'Your token'"
      />
      <input
        class="p-2 bg-blue-700 hover:bg-blue-500 c shadow-md cursor-pointer text-blue-50 rounded"
        type="submit"
        value="Submit"
        :class="{ 'opacity-40': isDesabled }"
        :disabled="isDesabled"
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
export default {
  name: "FormCall",
  data() {
    return {
      token: null,
      errors: [],
    };
  },
  props: {
    errorMessage: Error,
    isDesabled: Boolean,
  },
  mounted() {
    if (localStorage.getItem("token"))
      this.token = localStorage.getItem("token");
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
        this.$emit("submit", this.token);
        localStorage.setItem("token", this.token);
      }
    },
  },
  watch: {
    token() {
      this.errors = [];
      this.$emit("tokenChange");
    },
    errorMessage() {
      this.errors.push(this.errorMessage);
    },
  },
};
</script>
