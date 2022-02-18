<template>
  <v-app>
    <v-navigation-drawer 
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      dark
      class="deep-purple accent-5"
    >
    <template v-slot:prepend>
      <v-list-item two-line v-if="$auth.loggedIn" to="/user">
        <v-list-item-avatar>
          <v-icon x-large>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{$auth.user.username}}</v-list-item-title>
          <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line v-else to="/login">
        <v-list-item-avatar>
          <v-icon x-large>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Entrar</v-list-item-title>
          <v-list-item-subtitle>Fazer login</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list-item-group active-class="grey--text">
     <v-list color="primary--text">
       <v-list-item to="/">
         <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Inicio
          </v-list-item-title>
        </v-list-item-content>
       </v-list-item>
       <v-list-item to="/searchAll" >
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
           Busca
          </v-list-item-title>
        </v-list-item-content>
       </v-list-item>
       <v-list-item to="/favorites" v-if="$auth.loggedIn">
         <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Favoritos
          </v-list-item-title>
        </v-list-item-content>
       </v-list-item>
     </v-list>
     </v-list-item-group>
     <!-- <template>
        <layout-picker class="mx-1" />
     </template> -->
     <template v-slot:append>
        <div class="pa-2" v-show="$auth.loggedIn">
          <v-btn block @click="logout()">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>


    <v-app-bar app :clipped-left="$vuetify.breakpoint.lgAndUp" color="secondary" dark flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="mr-2"></v-app-bar-nav-icon>
      <v-card width="1050" class="mx-auto" color="secondary" flat >
        <v-row>
          <v-toolbar-title to="/"> {{title}} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/searchAll" text> <v-icon left dark> mdi-magnify </v-icon> busca </v-btn>
          <div v-if="$auth.loggedIn"> 
                <v-menu
                  v-model="loginmenu"
                  :close-on-content-click="false"
                  offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn class="mt-1 mr-3" small icon v-on="on">
                          <v-avatar class="deep-purple accent-4">
                            <span class="white--text headline" > {{$auth.user.username[0]}} </span>
                          </v-avatar>
                        </v-btn>
                    </template>
                    <v-card>
                      <v-list>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{$auth.user.username}} </v-list-item-title>
                            <v-list-item-title>{{$auth.user.email}} </v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn small to="/user" >Perfil</v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                      <v-card-actions>
                        <v-btn small text @click="loginmenu = false" >Fechar</v-btn>
                        <v-btn small text @click="logout()"> Encerrar a Sessão </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
              </div>
              <div v-else >
                <v-btn @click="dialog = !dialog" text > <v-icon left dark> mdi-account </v-icon> Entrar </v-btn>
              </div>
        </v-row>
      </v-card>
    </v-app-bar>

    <v-main class="background">
        <Nuxt />
        <v-snackbar 
          v-for="(snack, i) in snacks.filter((s)=> s.showing)" :key="i + Math.random()"
          v-model="snack.showing"
          :timeout="snack.timeout"
          :color="snack.color"
          :style="`bottom: ${i * 60 + 8}px`"
        >
        <v-btn slot="action" icon small @click="snack.showing = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        {{snack.text}}</v-snackbar>
    </v-main>

    <v-dialog max-width="500" v-model="dialog">
      <login-logar @closeDialog="dialog = $event"/>
    </v-dialog>

    <layout-footer/>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'DefaultLayout',
  // middleware:"initData",
  data () {
    return {
      title: 'Estudo da Lei',
      dialog: false,
      snack: false,
      loginmenu: false,
      drawer: false
    }
  },
  computed:{
    ...mapGetters({
      snacks:"snackbars/readSnackbars"
    })
  },
  methods:{
    logout(){
      this.$auth.logout()
      this.drawer = false
      this.$store.dispatch("snackbars/setSnackbars", {text:'Sessão enecerrada!', color:'success', timeout:'3000'})
    },
  }
}
</script>

<style scoped>
.background{
  background-color: rgba(138, 138, 138, 0.11)
}
</style>