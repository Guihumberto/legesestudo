<template>
  <v-container>
    <v-card width="1080" class="mx-auto pb-2" flat color="cyan">
      <v-card-title>Painel de Leis</v-card-title>
      <v-card-subtitle>Legislação em geral</v-card-subtitle>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="mx-6"
          dense
          outlined
          color="black"
          background-color="white"
          label="Buscar.."
          v-model="findLaw"
        ></v-text-field>
      <v-card  class="mx-2 pb-2" flat color="cyan">
        <v-card-text v-if="!findLaw.length">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4" v-for="law in listLaws" :key="law.title">
              <v-hover v-slot="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                  max-height="380"
                >
                 <nuxt-link :to="{
                    name: 'leges',
                    params:{leges: law.name},
                    query:{id:law.id}  
                  }">
                    <v-img
                      :aspect-ratio="16/9"
                      src="https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126884__340.png"
                      contain>
                  
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
                        style="height: 100%;"
                      >
                        {{law.law}}
                      </div>
                    </v-expand-transition>
                  </v-img>
                  </nuxt-link>
                  <v-card-text
                    class="pt-4 textContainer"
                    style="position: relative;"
                  >
                    <v-btn fab absolute right top @click="toggleFavorite(law)" title="favoritar">
                          <div v-if="$auth.loggedIn">
                            <v-icon v-if="law.favSelect" color="yellow darken-3">mdi-star</v-icon>
                            <v-icon v-else color="gray">mdi-star-outline</v-icon>
                          </div>
                          <div v-else>
                            <v-icon color="gray">mdi-star-outline</v-icon>
                          </div>   
                    </v-btn>
                    <div class="font-weight-light grey--text text-h6">
                      {{law.nro_law}}
                    </div>
                    <h3 class="text-h6 font-weight-light orange--text">
                      {{law.name | truncate(30)}}
                    </h3>
                    <div class="font-weight-light text-h7 text-justify">
                      {{law.description | truncate(80)}}
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          <v-subheader>Resultado: <span v-if="searchLawFiltred.length > 1">&nbsp;{{searchLawFiltred.length}} normas encontradas</span> <span v-else>&nbsp;nenhuma norma encontrada</span> </v-subheader>
            <v-card class="mb-2" v-for="lei in searchLawFiltred" :key="lei.id" hover
              :to="{
                    name: 'leges',
                    params:{leges: false},
                    query:{id:lei.id}
                    
                  }"
            >
              <v-card-title>{{lei.name}}
                <v-spacer></v-spacer>
                <small>{{lei.law}}</small>
              </v-card-title>
              <v-card-subtitle>{{lei.nro_law}}</v-card-subtitle>
              <v-card-text>
                {{lei.description | truncate(120)}}
              </v-card-text>
            </v-card>
          </v-hover>
        </v-card-text>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware:"initData",
  data(){
    return{
      findLaw: "",
      favLaw: false,
      favoriteLaw: false,
    }
  },

  computed:{
    laws(){
      return this.$store.getters.readLaws
    },
    searchLawFiltred(){
      return this.laws.filter( law =>
        law.nro_law.replace(".", "").toLowerCase().match(this.findLaw.toLowerCase().replace(/[\[\].!'@,><|://\\;&*()_+=]/g, ""))
      )
    },
    favoriteLaws(){
      return this.$store.getters['user/favorites']
    },
    favaritesIds(){
      let favIds = []
      if(this.favoriteLaws){
        this.favoriteLaws.forEach((law)=>{
        favIds.push(law.id)
        })
      }  
      return favIds
    },
    listLaws(){
      let favorite = []
      
      if(this.laws){
          this.laws.forEach((law)=>{
            if(this.favaritesIds.includes(law.id)) {
              law['favSelect'] = true
              favorite.push(law) 
            } else {
              law['favSelect'] = false
              favorite.push(law)
            }
          })
      }
      return favorite
    },
  },

  methods:{
    lawIsLiked(index){
      let liked = false
      if(this.favoriteLaws){
        const id = index
        liked = this.favoriteLaws.some((fav) => fav.id == id )
      }
      this.favoriteLaw = liked
      return liked
    },
    toggleFavorite(law){
      if(!this.$auth.loggedIn){
        return this.$store.dispatch("snackbars/setSnackbars", {text:'Faça login ou crie uma conta para adicionar uma lei ao seus favoritos', color:'error', timeout:'3000'})
      }
      this.lawIsLiked(law.id)
      this.favoriteLaw = !this.favoriteLaw
      if(this.favoriteLaw){
        this.favoritar(law)
      }else{
        this.unFav(law.id)
      }
    },
    favoritar(law){
     this.$store.commit("user/addLawFav", law)
      let userFav = this.$store.getters['user/favoritesGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../graphql/updateLikes.gql"),
          variables:variables
        })

        this.$store.dispatch("snackbars/setSnackbars", {text:'Você adicionou uma lei ao seus favoritos', color:'success'})
    },
    unFav(index){
      this.$store.commit("user/removeLawFav", index)

      let userFav = this.$store.getters['user/favoritesGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../graphql/updateLikes.gql"),
          variables:variables
        })

        this.$store.dispatch("snackbars/setSnackbars", {text:'Você Removeu uma lei dos seus favoritos', color:'error'})
    },
    error(){
      this.$store.dispatch("snackbars/setSnackbars", {text:'Faça login ou crie uma conta para adicionar uma lei ao seus favoritos', color:'error', timeout:'3000'})
    }
  },

  async mounted(){
    if(this.$store.getters['user/favorites'] == null){
      console.log("favorites")
      await this.$store.dispatch("user/getFavorites")
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
.textContainer{
  background-color: rgba(228, 228, 238, 0.5);
}
</style>
