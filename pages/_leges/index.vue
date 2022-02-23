<template>
  <v-container>
    <v-card width="1080" class="mx-auto mb-3" flat>
      <layout-breadcrumbs :law="infolaw.law" />
      <leges-config @fontSize="pagination.fontSizeProp = $event" :pagination="pagination" @search="findDispositive = $event" 
      @artPerpage="dispositiveScreen = $event" @seletcArt="testArt($event)" :dispositiveScreen="dispositiveScreen" />
      <v-card width="980" flat class="mx-auto">
        <v-card-title>
          <v-spacer></v-spacer>
          <leges-structura @seletcArt="testArt($event)" :law="idLaw" />
          <leges-anexos />
          <leges-options />
        </v-card-title>
      </v-card>
      <leges-titleLaw :infolaw="infolaw" />
  
      <v-btn icon large @click="toggleFavorite" v-if="$auth.loggedIn">
        <v-icon large :color="lawIsLiked? 'yellow darken-3':'grey lighten-1'" >mdi-star</v-icon>
      </v-btn>
      <v-btn @click="error" icon large v-else title="Login necessário!">
        <v-icon large color="grey lighten-1" >mdi-star</v-icon>
      </v-btn>

      <div v-show="!art">
        <leges-pagination v-show="!findDispositive" :dispositiveScreen="dispositiveScreen" :pagination="pagination" :pageTot="totalCount"/>
      </div>

      <v-card-text>
          <div v-for="text in listFavoriteTextLaws" :key="text.id">
            <v-hover v-slot="{ hover }">
              <div :class="text.structura ? 'structura':'none'">
                <div :style="revoked(text.text)" :id="text.id">
                  <p class="text-justify textLaw" :style="{ fontSize: pagination.fontSizeProp + 'px'}" v-if="!text.revogado" :title="`art ${text.art}º`">
                    <v-badge v-show="text.questions.length > 0 || text.comments.length > 0" color="success" bordered left :content="text.questions.length" overlap>
                    <v-btn x-small @click="text.show = !text.show" fab icon> <v-icon>mdi-message-reply-text</v-icon></v-btn></v-badge> <span v-html="text.text"> </span> 
                    <v-avatar height="14" width="1" v-show="hover" v-if="$auth.loggedIn" >
                      <v-btn @click="toggleTextLawFavorite(text)" icon>
                        <v-icon :color="text.favSelect ? 'error':'secondary'" x-small>mdi-heart</v-icon>
                      </v-btn>
                      <leges-menuInception :commentList="text.comments" :id="text.id" :textData="text" :favText="text.favSelect" @FavInception="toggleTextLawFavorite(text)" :law="infolaw" />
                    </v-avatar>
                  </p>
                </div>
              </div>
            </v-hover>
            <transition name="question_2"
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut">
              <v-card v-if="text.show" :id="text.id" elevation="10">
                <leges-questions :textquestions="text.questions" :textcomments="text.comments" @close="text.show = $event" />
              </v-card>
            </transition>
          </div>
      </v-card-text>

      <div v-show="!findDispositive">
        <leges-pagination v-show="!art" :dispositiveScreen="dispositiveScreen" :pagination="pagination" :pageTot="totalCount" @onTopPage="topPage($event)" />
      </div>
 
    </v-card>
  </v-container>
</template>

<script>

import gql from "graphql-tag";

export default {
  data(){
    return{
      favoriteLaw: false,
      favoriteTextLaw: false,
      searchAll: false,
      findDispositive: "",
      show: false,
      start: 0,
      limit: 100,
      idLaw: this.$route.query.id,
      artSearch: this.$route.query.art,
      search: "",
      artigo: null,
      art: null,
      dispositiveScreen: 10,
      qtdDispositive: 10,
      pagination:{
        page: 1,
        fontSizeProp: 15,
      }
    }
  },
  apollo: {
        textlaw: {
          query: gql`
            query (
              $start:Int!
              $limit:Int!
              $law:ID!
            ){
              lawtexts(sort: "art:asc, org:asc", start: $start, limit: $limit, where: {law:{id:$law}}) {
                id
                art
                text
                show
                org
                structura
                revogado
                questions{
                  id
                  textQuestion
                  response
                  question_info{
                    institute
                    office
                    year
                    organizadora{
                      name
                    }
                    area
                  }
                }
                comments{
                  id
                  comments
                  type
                  tags{
                    name
                  }
                }
              },
            }
          `,
          update: data => data.lawtexts,
          variables() {
            return {
              start: (this.pagination.page - 1) * this.dispositiveScreen,
              limit: this.dispositiveScreen,
              law: this.idLaw,
            };
          },
        },
        searchWords: {
          query: gql`
          query($id:ID! $search:String!){
            lawtexts(sort: "art:asc, org:asc", where:{law:{id:$id}, text_contains:$search}, limit:5){
              id
                art
                structura
                text
                show
                org
                revogado
                questions{
                  id
                  textQuestion
                  response
                  question_info{
                    institute
                    office
                    year
                    organizadora{
                      name
                    }
                    area
                  }
                }
                comments{
                  id
                  comments
                  type
                  tags{
                    name
                  }
                }
            }
          }
          `,
          update: data => data.lawtexts,
          variables() {
            return {
              id: this.idLaw,
              search: this.findDispositive
            };
          },
        },
        searchArt: {
          query: gql`
          query($id: ID!, $artigo: Int) {
            lawtexts(
              sort: "art:asc, org:asc"
              where: { law: { id: $id }, art: $artigo }
          
            ) {
              id
              art
              structura
              text
              show
              org
              revogado
              questions {
                id
                textQuestion
                response
                question_info{
                    institute
                    office
                    year
                    organizadora{
                      name
                    }
                    area
                  }
              }
              comments {
                id
                comments
                type
                tags {
                  name
                }
              }
            }
          }
          `,
          update: data => data.lawtexts,
          variables() {
            return {
              id: this.idLaw,
              artigo: this.art
            };
          },
        }
  },

  computed:{
    filtro(){
      if(this.findDispositive){
        let exp = new RegExp(this.findDispositive.trim().replace(/[\[\]!'@,><|://\\;&*()_+=]/g, ""), "i")
        return this.searchWords.filter(text => exp.test(text.text))
      } else if (this.art){
        parseInt(this.art)
        return this.searchArt
      }else{
        return this.textlaw
      }
    },
    searchAllFiltred(){
      return this.searchWords.filter( law =>
        law.text.toLowerCase().match(this.findDispositive.toLowerCase().replace(/[\[\].!'@,><|://\\;&*()_+=]/g, ""))
      )
    },
    infolaw(){
      let laws = this.$store.getters.readLaws
      let lawSelect = ''
      laws.forEach(law => {
        if(law.id == this.idLaw){
          lawSelect = law
        }
      })
      return lawSelect
    },
    userFavoritesLaw(){
      return this.$store.getters['user/favorites']
    },
    lawIsLiked(){
      let liked = false
      if(this.userFavoritesLaw){
        const id = this.idLaw
        liked = this.userFavoritesLaw.some((fav) => fav.id === id )
      }
      this.favoriteLaw = liked
      return liked
    },
    userFavoritesTextLaw(){
      return this.$store.getters['user/favoritesText']
    },
    favaritesTextLawIds(){
      let favIds = []
      if(this.userFavoritesTextLaw){
        this.userFavoritesTextLaw.forEach((law)=>{
        favIds.push(law.id)
        })
      }  
      return favIds
    },
    listFavoriteTextLaws(){
      let favorite = []
      
      if(this.filtro){
          this.filtro.forEach((law)=>{
            if(this.favaritesTextLawIds.includes(law.id)) {
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

  directives:{
    bold(element){

      let words = element.innerText.split(' ')

      words.forEach((text, index) => {
       
       words[index] = text.charAt(0).toUpperCase().bold() + text.slice(1)

      })

      element.innerText = words.join(' ')

    }
  },

  async asyncData({app, route }){
    const client = app.apolloProvider.defaultClient
    let id = route.query.id

    const qry = {
      query:require("../../graphql/totalCount.gql"),
      variables:{id}
    }

    let totalCount = []
    await client.query(qry).then(data => {
      totalCount = data.data.lawtextsConnection.aggregate.count
    })

    return{ totalCount }
  },

  methods: {
    revoked(index){
      return index.toLowerCase().split(' ').includes('(revogado', 'revogado', '(revogados') 
      ? "color: red"
      : "color: black"
    },
    testArt(index){
      this.art = parseInt(index)
    },
    topPage(i){
      return window.scrollTo(0, 200);
    },
    toggleFavorite(){
      this.favoriteLaw = !this.favoriteLaw
      if(this.favoriteLaw){
        this.favLaw()
      }else{
        this.unFav()
      }
    },
    favLaw(){
      this.$store.commit("user/addLawFav", this.infolaw)
      let userFav = this.$store.getters['user/favoritesGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../../graphql/updateLikes.gql"),
          variables:variables
        })

        this.$store.dispatch("snackbars/setSnackbars", {text:'Você adicionou uma lei ao seus favoritos', color:'success'})

    },
    unFav(){
      this.$store.commit("user/removeLawFav", this.idLaw)

      let userFav = this.$store.getters['user/favoritesGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../../graphql/updateLikes.gql"),
          variables:variables
        })

        this.$store.dispatch("snackbars/setSnackbars", {text:'Você Removeu uma lei dos seus favoritos', color:'error'})
    },
    error(){
      this.$store.dispatch("snackbars/setSnackbars", {text:'Faça login ou crie uma conta para adicionar uma lei ao seus favoritos', color:'error', timeout:'3000'})
    },
    textLawIsLiked(index){
      let liked = false
      if(this.userFavoritesTextLaw){
        const id = index
        liked = this.userFavoritesTextLaw.some((fav) => fav.id == id )
      }
      this.favoriteTextLaw = liked
      return liked
    },
    toggleTextLawFavorite(law){
      if(!this.$auth.loggedIn){
        return this.$store.dispatch("snackbars/setSnackbars", {text:'Faça login ou crie uma conta para adicionar um dispositivo aos seus favoritos', color:'error', timeout:'3000'})
      }
      this.textLawIsLiked(law.id)
      this.favoriteTextLaw = !this.favoriteTextLaw
      if(this.favoriteTextLaw){
        this.favoritarTextLaw(law)
      }else{
        this.unFavTextLaw(law.id)
      }
    },
    favoritarTextLaw(law){
      console.log('fav')
      this.$store.commit("user/addLawFavText", law)
      let userFav = this.$store.getters['user/favoritesTextGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../../graphql/updateFavTextLaw.gql"),
          variables:variables
        })
       this.$store.dispatch("snackbars/setSnackbars", {text:'Você adicionou um dispositivo ao seus favoritos', color:'success'})
    },
    unFavTextLaw(index){
      console.log('unfav')
      this.$store.commit("user/removeLawFavText", index)

      let userFav = this.$store.getters['user/favoritesTextGQL']

      const variables = {
        idUser: this.$auth.user.id,
        favoritesLaw:userFav
      }

        this.$apollo.mutate({
          mutation:require("../../graphql/updateFavTextLaw.gql"),
          variables:variables
        })
      this.$store.dispatch("snackbars/setSnackbars", {text:'Você Removeu um dispositivo dos seus favoritos', color:'error'})
    }
  },
  async created(){
       const cookie = this.$cookiz.get('page')
        if(cookie) {
           this.dispositiveScreen = cookie.qdtArt || 10
           this.pagination.fontSizeProp = cookie.fontSize || 12
        }     

        if(this.artSearch){
          return this.art = this.artSearch
        }
        // this.$route.params.leges
        // ? this.art = this.$route.params.leges
        // : this.art = null
  },
  async mounted(){
    if(this.$auth.loggedIn){
      if(this.$store.getters['user/favorites'] == null){
      console.log("favorites")
      await this.$store.dispatch("user/getFavorites")
      }
      if(this.$store.getters['user/favoritesText'] == null){
        console.log("favoritesText")
        await this.$store.dispatch("user/getFavoritesText")
      }
    }
  }
}
</script>

<style scoped>
.structura{
  text-transform: uppercase;
  margin-bottom: 3px;
  font-weight: bold;
}
.textLaw{
  font-family: 'Century Gothic', Courier, monospace;
  line-height: 1.7;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
}

.art{
  border: solid 1px rgb(110, 106, 106);
  padding: 2px;
  border-radius: 7px;
}

.textQuestions{
  line-height: 1.5
}

.question-enter, .question-leave-to{
  opacity: 0
}

.question-enter-active{
  transition: opacity .3s ease;
}

.question-leave-active{
  transition: opacity .3s ease-out; 
}

.text-enter-active{
  animation: animation_question 1s;
}

.text-leave-active{
  animation: animation_question 1s reverse;
}

@keyframes animation_question {
  from {
    background: #fff;
  }
  to {
    background: #999;
  }
}

</style>
