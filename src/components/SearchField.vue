<template>
  <div class="p-8">
    <div class="bg-white flex items-center rounded-full shadow-xl">
      <input
        class="rounded-l-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
        id="search"
        type="text"
        placeholder="Search"
        @input="$emit('input', $event.target.value)"
      />

      <div class="p-2">
        <button
          class="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
        >
          <img src="@/assets/search-icon.png" alt="" class="w-4" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SearchField',
  model: {
    prop: 'search',
    event: 'input',
  },
  props: {
    search: {
      type: String,
      required: false,
    },
  },
}
</script>
