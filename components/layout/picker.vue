<template>
  <v-row justify="center">
    <v-date-picker v-model="picker" width="240" locale="pt-br"></v-date-picker>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      }
    },
  }
</script>