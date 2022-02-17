<template>
    <v-row>
        <v-col cols="12" sm="6">
          <v-card-title>{{infolaw.name}}</v-card-title>
          <v-card-subtitle>{{infolaw.nro_law}}</v-card-subtitle>
        </v-col>
        <v-col cols="12" sm="6">
          <v-card-subtitle>{{infolaw.description}}</v-card-subtitle>
        </v-col>
      </v-row>
</template>

<script>
export default {
    data(){
      return{
        lawFavorite: false
      }
    },
    props:{
        infolaw:{
            required: true
        },
    },
}
</script>