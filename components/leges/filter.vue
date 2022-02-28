<template>
    <v-row v-if="$auth.loggedIn"> 
        <v-switch
        class="mr-2" dense
        label="apenas favoritos"
        v-model="filter.isFilter"
        @click="listFavTextLaw(filter.isFilter)"
        ></v-switch>
        <v-switch
        class="mr-2" dense
        label="com questões"
        :disabled="filter.isFilter"
        v-model="filter.withQuestions"
        @click="$emit('filtersQc', filter.withQuestions)"
        ></v-switch>
    </v-row>
    <v-row v-else>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                v-bind="attrs"
                v-on="on"
                text
                >
                <v-switch
                class="mr-2" dense
                label="apenas favoritos"
                disabled
                v-model="fake"
                @click="fakeMsg"
                ></v-switch>
                <v-switch
                class="mr-2" dense
                disabled
                label="com questões"
                v-model="fake"
                @click="fakeMsg"
                ></v-switch>
                </v-btn>
            </template>
            <span>Faça o login para utilizar todas as funcionalidades.</span>
        </v-tooltip>
    </v-row>
  
</template>

<script>
export default {
    data(){
        return{
            fake: false,
            ListFavoritesTextLaw: [],
            idLaw: this.$route.query.id
        }
    },
    props:{
        filter:{
            required: true
        }
    },
    methods:{
        fakeMsg(){
            this.fake = true
            this.fake = false
            this.$store.dispatch("snackbars/setSnackbars", {text:'Você precisa estar logado para esta função', color:'error'})
        },
        listFavTextLaw(index){
            if(index){
                this.$emit('filtersFav', this.ListFavoritesTextLaw)
            }
        }
    },
    async fetch(){
      const client = this.$apollo.getClient()
      const id = this.idLaw
      const idUser = this.$auth.user.id
      const query = {
        query: require("../../graphql/aFavoritesDispositive.gql"),
        variables:{id, idUser}
      }

      await client.query(query).then(data => {
        console.log(data)
        this.ListFavoritesTextLaw = data.data.user.favoritesText
        store.commit("user/setFavoritesText", favoritesText)
      }).catch(e => console.log(e))
    }
}
</script>