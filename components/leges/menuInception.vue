<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          icon
          small
        >
          <v-icon x-small>mdi-plus-circle</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>    
            <v-list-item-content>
              <v-list-item-title>Painel</v-list-item-title>
              <v-list-item-subtitle>Favoritar Dispositivo</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :class="favText ? 'red--text' : ''"
                icon
                @click="$emit('FavInception', !favText)"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-if="$auth.user.id === 1">
            <v-list-item-action>
              <leges-cadQuestions :textData="textData" />
            </v-list-item-action>
            <v-list-item-title>Inserir Questões</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="$auth.user.id === 1">
            <v-list-item-action>
              <leges-cad :commentList="commentList" :id="id" />
            </v-list-item-action>
            <v-list-item-title>Inserir Comentários</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text
            @click="menu = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
    props:{
      textData:{
        required: true
      },
      commentList:{
        required:false
      },
      id:{
        required:true
      },
      favText:{
        required:false
      }
    }
  }
</script>