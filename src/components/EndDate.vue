<template>
  <div>
    <label for="start" class="mr-4">End date:</label>
    <input
      type="date"
      id="start"
      name="trip-start"
      :value="currentDate"
      @change="$emit('change', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'EndDate',
  model: {
    prop: 'dateTo',
    event: 'change',
  },
  props: {
    dateTo: {
      type: String,
      required: false,
    },
  },
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('en-CA')
    },
  },
}
</script>
