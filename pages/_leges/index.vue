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
        </v-card-title>
      </v-card>
      <leges-titleLaw :infolaw="infolaw" />

      <v-btn icon large @click="toggleFavorite" v-if="$auth.loggedIn">
        <v-icon large :color="lawIsLiked? 'yellow darken-3':'grey lighten-1'" >mdi-star</v-icon>
      </v-btn>
      <v-btn @click="error" icon large v-else title="precisa estar logado">
        <v-icon large color="grey lighten-1" >mdi-star</v-icon>
      </v-btn>

      <div v-show="!art">
        <leges-pagination v-show="!findDispositive" :dispositiveScreen="dispositiveScreen" :pagination="pagination" :pageTot="totalCount"/>
      </div>

      <v-card-text>
          <div v-for="text in filtro" :key="text.id">
            <v-hover v-slot="{ hover }">
              <div :class="text.structura ? 'structura':'none'">
                <div :style="revoked(text.text)" :id="text.id">
                  <p class="text-justify textLaw" :style="{ fontSize: pagination.fontSizeProp + 'px'}" v-if="!text.revogado" :title="`art ${text.art}º`">
                    <v-badge v-show="text.questions.length > 0 || text.comments.length > 0" color="success" bordered left :content="text.questions.length" overlap>
                    <v-btn x-small @click="text.show = !text.show" fab icon> <v-icon>mdi-message-reply-text</v-icon></v-btn></v-badge> <span v-html="text.text"> </span> 
                    <v-avatar height="14" width="1" v-show="hover" v-if="$auth.loggedIn" >
                      <leges-menuInception />
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
      searchAll: false,
      findDispositive: "",
      show: false,
      start: 0,
      limit: 100,
      idLaw: this.$route.query.id,
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
    }
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
    
    const query = {
      query:require("../../graphql/lawSingle.gql"),
      variables:{id}
    }

    const qry = {
      query:require("../../graphql/totalCount.gql"),
      variables:{id}
    }

    let totalCount = []
    await client.query(qry).then(data => {
      totalCount = data.data.lawtextsConnection.aggregate.count
    })

    let infolaw = []
    await client.query(query).then(data => {
      infolaw = data.data.law
    })

    return{ infolaw, totalCount }
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
    }
  },
  created(){
       const cookie = this.$cookiz.get('page')
        if(cookie) {
           this.dispositiveScreen = cookie.qdtArt || 10
           this.pagination.fontSizeProp = cookie.fontSize || 12
        }     

        // if(this.$route.params.leges){
        //   return this.art = this.$route.params.leges
        // }
        // this.$route.params.leges
        // ? this.art = this.$route.params.leges
        // : this.art = null
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
