<template>
  <v-app>
    <v-app-bar
      color="secondary"
      dark
      fixed
      app
    >
    <v-card width="1080" class="mx-auto" color="secondary" flat>
       <v-toolbar-title to="/">
        <v-icon>mdi-forum</v-icon> {{title}}
        <v-spacer></v-spacer>
      </v-toolbar-title>
    </v-card>
    </v-app-bar>
    <v-main class="background">
      <v-container >
        <Nuxt />
      </v-container>
    </v-main>
    <layout-footer/>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Leis para Concurso'
    }
  }
}
</script>

<style scoped>
.background{
  background-color: rgba(138, 138, 138, 0.11)
}
</style>