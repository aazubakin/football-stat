<template>
  <div>
    <label for="start" class="mr-4">Start date:</label>
    <input
      type="date"
      id="start"
      name="trip-start"
      class="mr-4"
      value="2021-06-01"
      @change="$emit('change', $event.target.value)"
    />
  </div>
</template>
<script>
export default {
  name: 'StartDate',
  model: {
    prop: 'dateFrom',
    event: 'change',
  },
  props: {
    dateFrom: {
      type: String,
      required: false,
    },
  },
}
</script>
