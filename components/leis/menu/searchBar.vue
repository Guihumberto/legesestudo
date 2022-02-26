<template>
  <v-card flat>
    <v-card-text>
      <v-row align-content="space-between">
        <v-col cols="12" sm="6" md="5">
          <v-text-field
            flat
            dense
            hide-details
            label="Busca..."
            prepend-inner-icon="mdi-magnify"
            solo-inverted
            v-model="searchData.wordSearch"
          ></v-text-field>
        </v-col>
        <v-col cols="6" sm="2" md="2">
          <v-btn-toggle
            color="primary"
            group
          >
          <v-btn @click="art--" small class="my-auto" icon><v-icon>mdi-chevron-left</v-icon></v-btn>
          <v-text-field
            flat
            dense
            label="Artigo"
            solo-inverted
            hide-details
            type="number"
            v-model="searchData.art"
            @input="sendSearch"
          ></v-text-field>
          <v-btn @click="art++" small class="my-auto" icon><v-icon>mdi-chevron-right</v-icon></v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data(){
      return{
        searchData:{
          art: null,
          wordSearch: ''
        }
      }
    },
    methods:{
      sendSearch(){
        this.$emit('sendSearch', this.searchData.art)
      }
    }
  }
</script>