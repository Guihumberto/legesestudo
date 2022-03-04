<template>
  <v-card
    flat
  >
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
            v-model="search"
            @keyup="searchEnv"
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-text-field
            flat
            dense
            hide-details
            solo-inverted
            label="Artigo"
            v-model="art"
            type="number"
            :rules="[rules.positive]"
            @input="seletcArt"
          >
          </v-text-field>
        </v-col>

        <v-col cols="6" sm="3" md="2">
          <v-select
            flat
            dense
            hide-details
            outlined
            label="Disp. por pág"
            v-model="dispositiveScreen"
            :items="[10, 20, 30, 40, 50]"
            @input="artPerPage"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="12" md="3">
          <v-btn-toggle
            v-model="toggle_exclusive"
            dense
          >
            <v-btn disabled>{{pagination.fontSizeProp}}</v-btn>
            <v-btn @click="plusFont">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="minusFont">
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <v-btn @click="pagination.familyFont = !pagination.familyFont">
              <v-icon>mdi-format-font</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        toggle_exclusive: [],
        search:"",
        art: null,
        rules: { positive: (v) => v > 0 || "Artigo Inválido",},
      }
    },
    props:{
      pagination: {required: false},
      dispositiveScreen: {required: false}
    },
    computed:{
      artEnv(){
        if(this.art > 0){
          return this.art
        }
      }
    },
    methods:{
        plusFont(){
          this.pagination.fontSizeProp++
          if(this.pagination.fontSizeProp < 5){
            this.pagination.fontSizeProp = 5
          }
          this.$cookiz.set('page', {
            fontSize: this.pagination.fontSizeProp
          })
          this.$emit('fontSize', this.pagination.fontSizeProp)
        },
        minusFont(){
          this.pagination.fontSizeProp--
          if(this.pagination.fontSizeProp < 5){
            this.pagination.fontSizeProp = 5
          }
          this.$cookiz.set('page', {
            fontSize: this.pagination.fontSizeProp
          })
          this.$emit('fontSize', this.pagination.fontSizeProp)
        },
        searchEnv(){
          this.$emit('search', this.search)
        },
        artPerPage(){
          this.$cookiz.set('page', {
            qdtArt: this.dispositiveScreen
          })
          this.$emit('artPerpage', this.dispositiveScreen)
        },
        seletcArt(){
          this.search = ''
          this.$emit('seletcArt', this.art)
        }
    }
  }
</script>