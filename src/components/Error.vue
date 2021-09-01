<template>
  <h1 class="text-center text-xl">{{ error.name }}: {{ error.message }}</h1>
</template>
<script>
export default {
  name: 'Error',
  props: {
    error: {
      type: Error,
      required: true,
    },
  },
}
</script>
