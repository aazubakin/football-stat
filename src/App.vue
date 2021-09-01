<template>
  <div id="app">
    <h1 class="mt-10 text-2xl">Турнирные таблицы результатов по футболу</h1>
    <div id="nav">
      <router-link to="/" v-if="$route.path !== '/'">На главную</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
