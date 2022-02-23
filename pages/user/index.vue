<template>
    <v-container>
        <v-card width="1080" class="mx-auto mb-3" flat>
            <v-card-title> <v-icon>mdi-tools</v-icon> Perfil e Favoritos</v-card-title>
            <v-card-subtitle>Favoritos</v-card-subtitle>
            <v-card-text>   
                <v-expansion-panels focusable>
                    <v-expansion-panel
                    v-for="(laws,index) in lawOrganize"
                    :key="index"
                    >
                    <v-expansion-panel-header>{{index}}</v-expansion-panel-header>
                    <v-expansion-panel-content v-for="law in laws" :key="law.id">
                        
                        <p class="text-justify textLaw" >
                            <span v-html="law.text" :title="`art.${law.art}`">

                            </span>
                        </p>
                    </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    middleware:'auth',
    data(){
        return{
            selected: [2],
        }
    },
    computed:{
        lawOrganize(){
              return this.favoritesTextLaw.reduce(function(acumulador, text){
                  if(!acumulador[text.law.name]) {
                      acumulador[text.law.name] = []   
                  }
                  acumulador[text.law.name].push(text)
                  return acumulador
              }, {})
          },
    },
    async asyncData({app, store}){
        let client = app.apolloProvider.defaultClient
        let id = app.$auth.user.id
        let query = {
            query: require("../../graphql/favoritesTextLaw.gql"),
            fetchPolicy: 'no-cache',
            variables:{id}
        }
        let favoritesTextLaw = null
        await client.query(query).then(data => {
            favoritesTextLaw = data.data.user.favoritesText;
            store.commit("user/setFavoritesText", favoritesText)
        }).catch(e => console.log(e))
        return{favoritesTextLaw}
    }
}
</script>

<style scoped>
.textLaw{
  font-family: 'Century Gothic', Courier, monospace;
  line-height: 1.7;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}
</style>