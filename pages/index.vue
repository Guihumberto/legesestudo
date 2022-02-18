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
  
      <v-card class="mx-2 pb-2" flat color="cyan">
        <v-card-text v-if="!findLaw.length">
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="4" v-for="law in listLaws" :key="law.title">
              <v-hover v-slot="{ hover }">
                <v-card height="250" hover
                    :title="law.name"
                    :to="{
                    name: 'leges',
                    params:{leges: false},
                    query:{id:law.id}  
                  }">
                  <v-card-title> 
                    <v-row>
                      <v-col cols="10">
                        <div style="color: red" v-if="hover">{{law.law}}</div> <div v-else>{{law.law}} </div>
                      </v-col>
                      <v-col cols="2">
                        <v-btn icon @click="toggleFavorite" title="favoritar">
                        <div v-if="$auth.loggedIn">
                          <v-icon v-if="law.favSelect" color="yellow darken-3">mdi-star</v-icon>
                          <v-icon v-else color="grey lighten-1">mdi-star-outline</v-icon>
                        </div>   
                      </v-btn>
                      </v-col>
                    </v-row>      
                  </v-card-title>
                  <v-card-subtitle> {{law.nro_law}} <br> {{law.name}}</v-card-subtitle>
                  
                  <v-card-text class="text-justify">{{law.description | truncate(110)}}</v-card-text>
                  <v-card-text class="text-justify">
                    <v-chip-group column>
                      <v-chip v-for="subject in law.subjects" :key="subject.name" small class="mr-1">{{subject.name}}</v-chip>
                    </v-chip-group>
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
      favLaw: false
    }
  },

  computed:{
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

       this.laws.forEach((law)=>{
         if(this.favaritesIds.includes(law.id)) {
           law['favSelect'] = true
           favorite.push(law) 
         } else {
           law['favSelect'] = false
           favorite.push(law)
         }
      })

      return favorite
    }
  },

  methods:{
    toggleFavorite(){
      this.favLaw = !this.favLaw
    }
  },
  async asyncData(context){
    const client = context.app.apolloProvider.defaultClient
    
    const query = {
      query:require("../graphql/laws.gql")
    }

    let laws = []
    await client.query(query).then(data => {
      laws = data.data.laws
    })

    return{ laws }
  },
  async mounted(){
    if(this.$store.getters['user/favorites'] == null){
      console.log("favorites")
      await this.$store.dispatch("user/getFavorites")
    }
  }
}
</script>
