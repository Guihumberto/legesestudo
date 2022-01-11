<template>
  <v-card
    flat
  >
    <v-card-text>
      <v-row
        justify="end"
      >
        <v-btn-toggle
          v-model="toggle_exclusive"
          dense
        >
          <v-btn disabled>{{fontSize}}</v-btn>
          <v-btn @click="plusFont">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn @click="minusFont">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn @click="noturno = !noturno">
            <v-icon v-if="noturno">mdi-moon-new</v-icon> <v-icon v-else>mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        toggle_exclusive: [],
        fontSize: 12,
        noturno: false
      }
    },
    methods:{
        plusFont(){
          this.fontSize++
          this.$emit('fontSize', this.fontSize)
        },
        minusFont(){
          this.fontSize--
          this.$emit('fontSize', this.fontSize)
        },
      
    }
  }
</script>